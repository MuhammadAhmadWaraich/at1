from django.core import serializers
from django.shortcuts import render
from .models import Question
import random

def index(request):
    # Get the ID of the first and last questions in the database
    first_id = Question.objects.order_by('id').first().id
    last_id = Question.objects.order_by('id').last().id
    
    # Initialize an empty list to store randomly selected IDs
    random_ids = []
    while len(random_ids) < 5:
        random_id = random.randint(first_id, last_id)
        
        # Check if the random ID exists in the database and has not been selected before
        if Question.objects.filter(id=random_id).exists() and random_id not in random_ids:
            random_ids.append(random_id)

    # Retrieve questions based on the randomly selected IDs
    questions = Question.objects.filter(id__in=random_ids)
    
    # Serialize the selected questions to JSON format
    questions_json = serializers.serialize('json', questions)
    
    # Retrieve distinct categories from the database
    categories = Question.objects.values_list('category', flat=True).distinct()

    # Render the index.html template with the serialized questions and categories
    return render(request, 'eduprod/index.html', {
        'questions_json': questions_json,
        'categories': categories
    })
