from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponseNotAllowed
from django.utils.dateparse import parse_datetime
from django.contrib.auth.models import User
from .models import Appointment
import json


def _json_body(request):
    try:
        return json.loads(request.body.decode("utf-8"))
    except Exception:
        return None


@csrf_exempt
@require_http_methods(["GET", "POST"])
def appointments_collection(request):
    if not request.user.is_authenticated:
        return JsonResponse({"error": "Auth required"}, status=401)

    if request.method == "GET":
        qs = Appointment.objects.filter(doctor=request.user)
        items = [a.to_dict() for a in qs]
        return JsonResponse({"results": items})

    # POST create
    data = _json_body(request)
    if not data:
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    patient_name = data.get("patient_name")
    scheduled_at = parse_datetime(data.get("scheduled_at") or "")
    if not patient_name or not scheduled_at:
        return JsonResponse({"error": "patient_name and scheduled_at required (ISO)"}, status=400)

    appt = Appointment.objects.create(
        doctor=request.user,
        patient_name=patient_name,
        patient_email=data.get("patient_email", ""),
        patient_phone=data.get("patient_phone", ""),
        reason=data.get("reason", ""),
        scheduled_at=scheduled_at,
        status=data.get("status", "scheduled"),
        notes=data.get("notes", ""),
    )
    return JsonResponse(appt.to_dict(), status=201)


@csrf_exempt
@require_http_methods(["GET", "PUT", "PATCH", "DELETE"]) 
def appointments_detail(request, appt_id: int):
    if not request.user.is_authenticated:
        return JsonResponse({"error": "Auth required"}, status=401)

    try:
        appt = Appointment.objects.get(id=appt_id, doctor=request.user)
    except Appointment.DoesNotExist:
        return JsonResponse({"error": "Not found"}, status=404)

    if request.method == "GET":
        return JsonResponse(appt.to_dict())

    if request.method in ("PUT", "PATCH"):
        data = _json_body(request)
        if not data:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
        for field in ["patient_name", "patient_email", "patient_phone", "reason", "status", "notes"]:
            if field in data:
                setattr(appt, field, data[field])
        if "scheduled_at" in data:
            dt = parse_datetime(data["scheduled_at"])
            if not dt:
                return JsonResponse({"error": "scheduled_at must be ISO datetime"}, status=400)
            appt.scheduled_at = dt
        appt.save()
        return JsonResponse(appt.to_dict())

    if request.method == "DELETE":
        appt.delete()
        return JsonResponse({"deleted": True})

    return HttpResponseNotAllowed(["GET", "PUT", "PATCH", "DELETE"]) 
from django.shortcuts import render

# Create your views here.
