from functools import lru_cache
import os
from jinja2 import (
    Environment,
    FileSystemLoader,
)
import json

@lru_cache(maxsize=None)
def get_data():
    with open('src/data/malayalam.json', 'r') as malayalam_file:
        malayalam = json.load(malayalam_file)
    return malayalam

def get_svg(letter):
    svg_path = f'src/assets/svgs/{letter}.svg'
    if os.path.exists(svg_path):
        with open(svg_path, 'r') as svg:
            return svg.read()
    else:
        return None

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
