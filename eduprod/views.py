from django.core import serializers
from django.shortcuts import render
from .models import Question
import random

def index(request):
    first_id = Question.objects.order_by('id').first().id
    last_id = Question.objects.order_by('id').last().id
    random_ids = []

    while len(random_ids) < 5:
        random_id = random.randint(first_id, last_id)
        if Question.objects.filter(id=random_id).exists() and random_id not in random_ids:
            random_ids.append(random_id)

    questions = Question.objects.filter(id__in=random_ids)
    questions_json = serializers.serialize('json', questions)
    categories = Question.objects.values_list('category', flat=True).distinct()

    return render(request, 'eduprod/index.html', {
        'questions_json': questions_json,
        'categories': categories
    })
