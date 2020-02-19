import json
from collections import OrderedDict

new_data = []

with open('..\\data\\forWeihao.json', 'r', encoding='utf-8') as f:
    raw_data = json.load(f, object_pairs_hook=OrderedDict)
    print('len(raw_data)', len(raw_data))

    for i, topic in enumerate(raw_data):
        if i == 9:
            break

        raw_data[topic]['keywords'].sort(key=lambda item: item['weight'], reverse=True)

        new_data.append({
            'topic': topic,
            'weight': raw_data[topic]['weight'],
            'keywords': raw_data[topic]['keywords'][:10]
        })

with open('..\\data\\data.json', 'w', encoding='utf-8') as f:
    f.write(json.dumps(new_data))