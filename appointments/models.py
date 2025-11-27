from django.db import models
from django.contrib.auth.models import User


class Appointment(models.Model):
    STATUS_CHOICES = [
        ("scheduled", "Scheduled"),
        ("completed", "Completed"),
        ("cancelled", "Cancelled"),
    ]

    doctor = models.ForeignKey(User, on_delete=models.CASCADE, related_name="appointments")
    patient_name = models.CharField(max_length=120)
    patient_email = models.EmailField(blank=True)
    patient_phone = models.CharField(max_length=30, blank=True)
    reason = models.CharField(max_length=255, blank=True)
    scheduled_at = models.DateTimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="scheduled")
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-scheduled_at"]

    def to_dict(self):
        return {
            "id": self.id,
            "doctor": self.doctor.username,
            "patient_name": self.patient_name,
            "patient_email": self.patient_email,
            "patient_phone": self.patient_phone,
            "reason": self.reason,
            "scheduled_at": self.scheduled_at.isoformat(),
            "status": self.status,
            "notes": self.notes,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
        }
from django.db import models

# Create your models here.
