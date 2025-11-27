from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json


@csrf_exempt
@require_http_methods(["POST"]) 
def signup(request):
	try:
		data = json.loads(request.body.decode('utf-8'))
	except json.JSONDecodeError:
		return JsonResponse({'error': 'Invalid JSON'}, status=400)

	username = data.get('username') or data.get('email')
	email = data.get('email')
	password = data.get('password')

	if not email or not password:
		return JsonResponse({'error': 'Email and password required'}, status=400)

	if User.objects.filter(email=email).exists():
		return JsonResponse({'error': 'Email already registered'}, status=409)

	username = username or email.split('@')[0]
	user = User.objects.create_user(username=username, email=email, password=password)
	return JsonResponse({'message': 'Signup successful', 'user': {'id': user.id, 'username': user.username, 'email': user.email}})


@csrf_exempt
@require_http_methods(["POST"]) 
def login_view(request):
	try:
		data = json.loads(request.body.decode('utf-8'))
	except json.JSONDecodeError:
		return JsonResponse({'error': 'Invalid JSON'}, status=400)

	email = data.get('email')
	password = data.get('password')

	if not email or not password:
		return JsonResponse({'error': 'Email and password required'}, status=400)

	try:
		user_obj = User.objects.get(email=email)
		username = user_obj.username
	except User.DoesNotExist:
		return JsonResponse({'error': 'Invalid credentials'}, status=401)

	user = authenticate(request, username=username, password=password)
	if user is None:
		return JsonResponse({'error': 'Invalid credentials'}, status=401)

	login(request, user)
	return JsonResponse({'message': 'Login successful', 'user': {'id': user.id, 'username': user.username, 'email': user.email}})


@require_http_methods(["POST"]) 
def logout_view(request):
	if not request.user.is_authenticated:
		return JsonResponse({'error': 'Not authenticated'}, status=401)
	logout(request)
	return JsonResponse({'message': 'Logged out'})


@require_http_methods(["GET"]) 
def me(request):
	if not request.user.is_authenticated:
		return JsonResponse({'authenticated': False})
	user = request.user
	return JsonResponse({'authenticated': True, 'user': {'id': user.id, 'username': user.username, 'email': user.email}})

# Create your views here.
