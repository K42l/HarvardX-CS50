from django.http import Http404, HttpResponse
from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request, "singlepage1/index.html")

texts = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dapibus arcu eu faucibus tristique.", 
         "Vestibulum hendrerit nulla eu gravida lobortis. In hac habitasse platea dictumst.",
         "Curabitur tempus orci non facilisis luctus. Sed quis laoreet diam, a lacinia elit. Curabitur maximus urna quis hendrerit semper.",
         "Donec vel ornare justo. Quisque scelerisque nisl tincidunt nulla dictum, ac tincidunt urna fringilla.",
         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac tellus et ipsum scelerisque rutrum non in sem.",
         "Donec aliquam, lorem in cursus porttitor, odio elit ullamcorper dolor, eu cursus turpis massa nec sapien.",
         "Praesent quis porttitor diam. Phasellus eu fermentum diam. Fusce consectetur massa sit amet odio iaculis malesuada.",
         "Praesent nibh leo, ultrices et iaculis id, imperdiet eu leo."]

def section(request, num):
    if len(texts) >= num:
        return HttpResponse(texts[num - 1])
    else:
        raise Http404("No such section")