from django.core import serializers
from django.shortcuts import render
from .models import Question
from django.contrib.auth.decorators import login_required

@login_required
def index(request):
    questions = Question.objects.all()
    questions_json = serializers.serialize('json', questions)
    categories = Question.objects.values_list('category', flat=True).distinct()

    return render(request, 'eduprod/index.html', {
        'questions_json': questions_json,
        'questions': questions  # Pass the queryset directly
    })
