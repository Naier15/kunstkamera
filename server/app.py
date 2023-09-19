from flask import Flask, request, Response, Request
from flask_cors import CORS
from zipfile import ZipFile
import json, os, shutil, uuid


app = Flask(__name__, static_url_path = "/tmp", static_folder = "tmp")
cors = CORS(app, origins = [
    'http://localhost:3000', 
    'http://digital-kunstkamera.ru', 
    'https://digital-kunstkamera.ru'
])
static_path = os.environ.get('static', f'./public/')
AUTH_KEY = 'kunstka.link'

def create_file(filename: str) -> bool:
    if not os.path.exists(filename):
        with open(filename, 'w') as file:
            pass

def create_folder(folder: str) -> bool:
    if not os.path.exists(folder):
        os.mkdir(folder)

def clear_folder(folder: str) -> bool:
    if os.path.exists(folder):
        shutil.rmtree(folder)
    os.mkdir(folder)

def is_authorized(request: Request) -> bool:
    token = request.headers.get('Token', '')
    with open('./auth.txt', 'rt') as file:
        tokens = list(map(lambda x: x[:-1], file.readlines()))
    return token in tokens

def extract_archive(archive: str, to: str) -> bool:
    with ZipFile(archive, 'r') as zip_file:
        zip_file.extractall(to)
    os.remove(archive)
 
@app.route( '/scene/', methods=['GET', 'POST'] )
def scene():
    stage = request.args.get('stage', '1')
    scene_path = f'{static_path}scene-data/scene{stage}.json'
    try:
        if request.method == 'GET':
            with open(scene_path, 'r', encoding = 'utf-8') as file:
                data = json.load(file)
            return json.dumps(data, ensure_ascii = False)
        elif request.method == 'POST':
            data = request.json
            with open(scene_path, 'w', encoding='utf-8') as file:
                json.dump(data, file, ensure_ascii = False, indent = 2)
            return {'status': 'success', 'code': 200}
    except:
        return { 'status': 'failed', 'code': 404 }


@app.route( '/modal/', methods=['GET', 'POST'] )
def modal():
    id = request.args.get('id', '1')
    modal_path = f'{static_path}modals-data/modal{id}.json'
    try:
        if request.method == 'GET':
            with open(modal_path, 'r', encoding = 'utf-8') as file:
                data = json.load(file)
            return json.dumps(data, ensure_ascii = False)
        elif request.method == 'POST':
            data = request.json
            with open(modal_path, 'w', encoding='utf-8') as file:
                json.dump(data, file, ensure_ascii = False, indent = 2)
            return {'status': 'success', 'code': 200}
    except:
        return { 'status': 'falied', 'code': 404 }

@app.route( '/images/<int:stage>/', methods=['GET', 'POST'] )
def images(stage: int):
    stage_path = f'{static_path}cache/{stage}/'
    try:
        if request.method == 'GET':
            files = list(filter( 
                lambda file: file.endswith('.jpg') or \
                    file.endswith('.jpeg')         or \
                    file.endswith('.png'), 
                os.listdir( stage_path )
            ))
            response = Response(
                response = json.dumps(files),
                status = 200,
                mimetype = 'application/json'
            )
            return response
        elif request.method == 'POST':
            create_folder(stage_path)
            for filename, file in request.files.items():
                file.save(f'{stage_path}{filename}')
            return {'status': 'success', 'code': 200}
    except Exception as ex:
        print(ex)
        return {'status': 'failed', 'code': 409}        

@app.route( '/imgs/<int:stage>/', methods=['POST'] )
def image_store(stage: int):
    img_path = f'{static_path}imgs/{stage}/'
    if not os.path.exists(img_path):
        return {'status': 'failed', 'code': 404, 'message': 'no such directory as stage parameter'}
    try:
        if request.method == 'POST':
            for filename, file in request.files.items():
                new_file = f'{img_path}{filename}'
                if os.path.exists(new_file):
                    os.remove(new_file)
                file.save(new_file)
            return {'status': 'success', 'code': 200}
    except Exception as ex:
        print(ex)
        return {'status': 'failed', 'code': 409}
    
@app.route( '/models/', methods=['POST'] )
def models_store():
    models_path = f'{static_path}models/'
    try:
        if request.method == 'POST':
            create_folder(models_path)
            for _, file in request.files.items():
                new_archive_path = f"{models_path}{file.filename.replace('.zip', '')}/"
                new_file_path = f'{new_archive_path}{file.filename}'
                clear_folder(new_archive_path)
                file.save(new_file_path)
                extract_archive(new_file_path, models_path)
            return {'status': 'success', 'code': 200}
    except Exception as ex:
        print(ex)
        return {'status': 'failed', 'code': 409}
    
@app.route( '/new-modal/', methods=['GET', 'DELETE'] )
def new_modal():
    img_path = f'{static_path}imgs/'
    try:
        if request.method == 'GET':
            files = os.listdir(img_path)
            new_modal_number = 1 if len(files) == 0 else max(list(map(int, files))) + 1
            os.mkdir(f'{img_path}{new_modal_number}/')
            return {'status': 'success', 'code': 200, 'new_modal_number': new_modal_number}
        elif request.method == 'DELETE':
            num = request.args.get('num', False)
            if not num:
                return {'status': 'failed', 'code': 404, 'message': 'required num parameter'}
            shutil.rmtree(f'{img_path}{num}/')
            return {'status': 'success', 'code': 200}
    except Exception as ex:
        print(ex)
        return {'status': 'failed', 'code': 500}
    
@app.route( '/auth/', methods=['GET', 'POST'] )
def auth():
    auth_path = './auth.txt'
    create_file(auth_path)
    key = request.args.get('key')
    if request.method == 'GET' and is_authorized(request):
        return {'status': 'success', 'code': 200}
    elif request.method == 'POST' and key == AUTH_KEY:
        token = uuid.uuid4().hex
        with open(auth_path, 'at') as file:
            file.write(token + '\n')
        return {'status': 'success', 'code': 200, 'token': token}
    else:
        return Response('Failed', status=401)

if __name__ == '__main__':
    app.run('0.0.0.0', 5000, debug = bool(os.environ.get('debug', True)))