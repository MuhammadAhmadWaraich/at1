from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages

def index(request):
    # Redirect to login page if user is not authenticated
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse("users:login"))
    # Render user.html template if user is authenticated
    return render(request, "users/user.html")

def login_view(request):
    if request.method == "POST":
        # Extract username and password from POST request
        username = request.POST["username"]
        password = request.POST["password"]
        # Authenticate user
        user = authenticate(request, username=username, password=password)
        if user is not None:
            # If user is authenticated, log the user in and redirect to index page
            login(request, user)
            return HttpResponseRedirect(reverse("users:index"))
        else:
            # If authentication fails, display error message and render login page again
            messages.success(request, "Invalid Credentials.")
            return render(request, "users/login.html")
    # Render login page if request method is not POST
    return render(request, "users/login.html")

def logout_view(request):
    # Log out user
    logout(request)
    # Display success message
    messages.success(request, "Successfully logged out.")
    # Redirect to login page
    return redirect(reverse('users:login'))
