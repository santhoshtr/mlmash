from functools import lru_cache
import os
from jinja2 import (
    Environment,
    FileSystemLoader,
)
import json

from svgpathtools import svg2paths
from lxml import etree


@lru_cache(maxsize=None)
def get_data():
    with open('src/data/malayalam.json', 'r') as malayalam_file:
        malayalam = json.load(malayalam_file)
    return malayalam

def get_svg(letter):
    svg_path = f'src/assets/svgs/{letter}.svg'
    if os.path.exists(svg_path):
        return update_svg_viewport(svg_path)
    else:
        return None

def update_svg_viewport(svg_file ):
    # Calculate the viewport
    paths, attributes = svg2paths(svg_file)

    min_x, min_y = float('inf'), float('inf')
    max_x, max_y = float('-inf'), float('-inf')

    for path in paths:
        xmin, xmax, ymin, ymax = path.bbox()
        min_x = min(min_x, xmin)
        min_y = min(min_y, ymin)
        max_x = max(max_x, xmax)
        max_y = max(max_y, ymax)

    width = max_x - min_x
    height = max_y - min_y

    # Parse the SVG file
    tree = etree.parse(svg_file)
    svg = tree.getroot()

    # Update the viewBox attribute
    svg.set('viewBox', f"{min_x-100} {min_y-100} {width+200} {height+200}")

    # Optionally update width and height attributes
    svg.set('width', str(width))
    svg.set('height', str(height+200))

    # Convert the modified SVG to a string
    svg_string = etree.tostring(tree, pretty_print=True, xml_declaration=True, encoding="utf-8").decode('utf-8')

    return svg_string

def render_template(template_path, data):
    env = Environment(
        loader=FileSystemLoader([".", "src/templates"]),
        keep_trailing_newline=True,
    )
    # Add environ global
    env.globals["environ"] = lambda key: os.environ.get(key)
    env.globals["get_context"] = lambda: data
    return env.get_template(template_path).render(data)


template_path='src/templates/letter.html'

if __name__ == '__main__':
    malayalam = get_data()
    vowels=malayalam.get('vowels')
    consonants=malayalam.get('consonants')
    chillus=malayalam.get('chillus')
    vowelsigns=malayalam.get('vowelsigns')
    conjuncts= malayalam.get('conjuncts')
    characters = vowels + consonants+ chillus + vowelsigns+ conjuncts
    lessons=malayalam.get('lessons')
    for character in characters:
        # For each letter render it to html and save it under the html directory
        html_dir = os.path.join('public/letter', character)
        os.makedirs(html_dir, exist_ok=True)
        lesson = lessons.get(character)
        if not lesson:
            lesson = {}
        svg = get_svg(character)
        if svg:
            lesson["svg"] = svg

        first_letter = character[0]
        related_letters = [c for c in conjuncts if first_letter in c]
        if related_letters and len(related_letters) > 0:
            lesson["related"] = related_letters

        if lesson:
            with open(os.path.join(html_dir, 'index.html'), 'w') as htmlfile:
                htmlfile.write(
                    render_template(template_path, {
                        'letters': {
                            'vowels':vowels,
                            'consonants': consonants,
                            'chillus' : chillus,
                            'vowelsigns':vowelsigns
                        },
                        'letter': character,
                        'lesson': lesson
                    })
                )
