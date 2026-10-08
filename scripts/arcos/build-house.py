"""Shared house geometry derived from the fictional SVG floor plan.
The existing SVG supplies all plan positions. Height and scale are design assumptions.
Used by build-house.py. The model is conceptual, not a construction drawing.
"""
import bpy, math, json, re, sys
from pathlib import Path
from mathutils import Vector

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'client/public/media/examples/arcos/house-v1'
OUT.mkdir(parents=True, exist_ok=True)
PLAN = ROOT / 'client/public/previews/arcos/floor-plan.svg'
S = .025  # illustrative metres per drawing unit; no measured site data
def xy(x,y): return ((x-400)*S,(414-y)*S)
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
def mat(name,color):
    m=bpy.data.materials.new(name);m.diffuse_color=(*color,1);m.use_nodes=True
    p=m.node_tree.nodes.get('Principled BSDF');p.inputs['Base Color'].default_value=(*color,1);p.inputs['Roughness'].default_value=.8
    return m
wall=mat('Clay walls',(.67,.66,.61)); floor=mat('Clay floor',(.77,.76,.70)); frame=mat('Openings',(.14,.16,.15)); furniture=mat('Furniture volumes',(.49,.50,.46)); ground=mat('Courtyard',(.59,.58,.51)); leaf=mat('Tree volume',(.28,.33,.25)); route=mat('Route',(.64,.18,.08))
roofs=[]
def box(name,x1,y1,x2,y2,z,h,m):
    x,y=xy((x1+x2)/2,(y1+y2)/2)
    bpy.ops.mesh.primitive_cube_add(size=1,location=(x,y,z+h/2));o=bpy.context.object;o.name=name
    o.dimensions=(abs(x2-x1)*S,abs(y2-y1)*S,h);bpy.ops.object.transform_apply(location=False,rotation=False,scale=True);o.data.materials.append(m)
    return o
box('Site',25,20,775,675,-.25,.1,ground)
for name,x1,y1,x2,y2 in [('North wing',80,70,720,250),('Living wing',80,250,270,580),('Sleeping wing',530,250,720,580)]:
    box(name+' slab',x1,y1,x2,y2,-.15,.15,floor)
    roofs.append(box(name+' roof',x1,y1,x2,y2,3,.18,wall))
# Exact solid wall centerlines from SVG, not inferred from generated photos.
polys=[[(80,190),(80,70),(720,70),(720,290)],[(720,360),(720,465)],[(720,535),(720,580),(530,580),(530,526)],[(530,480),(530,250),(464,250)],[(336,250),(270,250),(270,300)],[(270,514),(270,580),(220,580)],[(148,580),(80,580),(80,278)],[(578,82),(578,159)],[(578,200),(578,283)],[(578,320),(578,456)],[(578,493),(578,568)],[(578,247),(708,247)],[(578,413),(708,413)]]
solid=[]
for i,poly in enumerate(polys):
    t=12 if i<7 else 7
    for a,b in zip(poly,poly[1:]):
        x1,x2=sorted((a[0],b[0]));y1,y2=sorted((a[1],b[1]))
        if x1==x2:x1-=t/2;x2+=t/2
        else:y1-=t/2;y2+=t/2
        box('Wall',x1,y1,x2,y2,0,3,wall);solid.append([x1,y1,x2,y2])
# Door thresholds/open glazing, with lintels. Living opening's lower half is open.
for name,a,b,t in [('Living opening',(270,300),(270,514),12),('Dining opening',(336,250),(464,250),12),('Passage opening',(530,480),(530,526),12),('Entrance',(148,580),(220,580),12),('Bath door',(578,159),(578,200),7),('Bedroom 1 door',(578,283),(578,320),7),('Bedroom 2 door',(578,456),(578,493),7)]:
    x1,x2=sorted((a[0],b[0]));y1,y2=sorted((a[1],b[1]));vertical=x1==x2
    if vertical:x1-=t/2;x2+=t/2
    else:y1-=t/2;y2+=t/2
    box(name+' lintel',x1,y1,x2,y2,2.55,.45,wall)
    box(name+' threshold',x1,y1,x2,y2,0,.025,frame)
for x,ya,yb in [(80,190,278),(720,290,360),(720,465,535)]:
    box('Window sill',x-6,ya,x+6,yb,0,.85,wall)
    box('Window head',x-6,ya,x+6,yb,2.25,.75,wall)
    box('Window frame',x-1,ya,x+1,ya+2,.85,1.4,frame)
    box('Window frame',x-1,yb-2,x+1,yb,.85,1.4,frame)
for name,coords,z,h in [('Sofa',(100,355,146,498),0,.7),('Coffee table',(176,389,222,456),0,.4),('Lounge chair',(179,470,224,500),0,.6),('Kitchen back',(97,87,298,115),0,.9),('Kitchen side',(97,115,125,211),0,.9),('Kitchen island',(175,150,275,188),0,.9),('Dining table',(360,141,495,194),.68,.1),('Bed 1',(630,270,694,359),0,.55),('Bed 2',(630,443,694,531),0,.55)]:
    box(name,*coords,z,h,furniture)
for y in [118,199]:
    for x in [370,412,454]:box('Dining chair',x,y,x+26,y+18,0,.5,furniture)
x,y=xy(401,414)
bpy.ops.mesh.primitive_cylinder_add(vertices=16,radius=.16,depth=2.5,location=(x,y,1.25));bpy.context.object.name='Single olive trunk';bpy.context.object.data.materials.append(frame)
bpy.ops.mesh.primitive_uv_sphere_add(segments=20,ring_count=10,radius=1,location=(x,y,2.7));tree=bpy.context.object;tree.name='Olive canopy placeholder';tree.scale=(1.55,1.5,.9);tree.data.materials.append(leaf)
nodes=[{'id':'living','plan':[185,330],'label':'Living, facing east'}, {'id':'threshold','plan':[270,330],'label':'Same opening'}, {'id':'court','plan':[315,330],'label':'Courtyard, still facing east'}, {'id':'court-north','plan':[320,295],'label':'Around the tree'}, {'id':'dining-door','plan':[400,265],'label':'Dining threshold'}, {'id':'dining','plan':[400,230],'label':'Dining, table ahead'}]
# Structural checks for this proposed route, including door and furniture clearance.
obstacles=solid+[[100,355,146,498],[176,389,222,456],[179,470,224,500],[97,87,298,115],[97,115,125,211],[175,150,275,188],[360,118,495,217]]
for a,b in zip(nodes,nodes[1:]):
    for j in range(101):
        t=j/100;px=a['plan'][0]*(1-t)+b['plan'][0]*t;py=a['plan'][1]*(1-t)+b['plan'][1]*t
        for x1,y1,x2,y2 in obstacles:
            assert not (x1-8<px<x2+8 and y1-8<py<y2+8),(a['id'],b['id'],'blocked',px,py)
        assert math.hypot(px-401,py-414)>40,'Route crosses tree planting zone'
(OUT/'route.json').write_text(json.dumps({'status':'proposed geometry study, not measured architecture','scaleAssumption':S,'eyeHeight':1.6,'orientation':'x east; y north; z up in Blender','nodes':nodes,'routeCheck':'Passed sampled clearance against plan walls, furniture and tree planting zone; not a full navigation mesh test'},indent=2))

# A single authored scene supplies both the browser model and its photographs.
import random, numpy as np
random.seed(37)
def material(name,color,rough=.7):
    m=mat(name,color);m.node_tree.nodes.get('Principled BSDF').inputs['Roughness'].default_value=rough
    return m
def textured(m,kind):
    n=512;rng=np.random.default_rng(15);ys,xs=np.mgrid[0:n,0:n]/n
    if kind=='oak':
        v=.055*np.sin(xs*160+3*np.sin(ys*8)+np.sin(xs*21+ys*3))+.025*np.sin(xs*480+ys*9)+rng.normal(0,.011,(n,n))
    else:v=rng.normal(0,.015,(n,n))+.014*np.sin(xs*41)*np.sin(ys*35)
    rgb=np.array(m.diffuse_color[:3]);pixels=np.ones((n,n,4),dtype=np.float32);pixels[:,:,:3]=np.clip(rgb+v[:,:,None],0,1)
    im=bpy.data.images.new(m.name+' surface',width=n,height=n);im.pixels.foreach_set(pixels.ravel());im.filepath_raw=str(OUT/(m.name.lower().replace(' ','-')+'.png'));im.file_format='PNG';im.save();im.pack()
    tex=m.node_tree.nodes.new('ShaderNodeTexImage');tex.image=im;m.node_tree.links.new(tex.outputs['Color'],m.node_tree.nodes.get('Principled BSDF').inputs['Base Color'])
    return m
oak=textured(material('Honey oak',(.47,.30,.15),.48),'oak')
plaster=textured(material('Limewash',(.78,.755,.69),.85),'plaster')
linen=textured(material('Linen',(.63,.59,.51),.95),'linen')
bronze=material('Bronze',(.13,.10,.07),.35);bronze.node_tree.nodes.get('Principled BSDF').inputs['Metallic'].default_value=.65
book=material('Book cloth',(.16,.20,.17));pages=material('Paper',(.76,.73,.65))
stoneM=[material('Limestone '+str(i),(.58+i*.012,.55+i*.011,.47+i*.011),.9) for i in range(5)]
floorM=[material('Paving '+str(i),(.61+i*.013,.58+i*.012,.51+i*.01),.77) for i in range(4)]
def finish(o,m,bevel=0):
    o.data.materials.clear();o.data.materials.append(m)
    if bevel:
        mod=o.modifiers.new('Soft construction edges','BEVEL');mod.width=bevel;mod.segments=2
        bpy.context.view_layer.objects.active=o
        bpy.ops.object.modifier_apply(modifier=mod.name)
        mod=o.modifiers.new('Weighted normals','WEIGHTED_NORMAL');bpy.ops.object.modifier_apply(modifier=mod.name)
    return o
for o in list(bpy.data.objects):
    if o.type!='MESH':continue
    if o.name.startswith(('Olive canopy','Single olive','Dining chair','Sofa','Coffee table','Lounge chair','Dining table')):
        bpy.data.objects.remove(o,do_unlink=True);continue
    if o.name.startswith(('Wall','Window sill','Window head','North wing roof','Living wing roof','Sleeping wing roof')):finish(o,plaster,.012)
    elif o.name.startswith('Kitchen'):finish(o,oak,.025)
    elif 'threshold' in o.name or 'frame' in o.name:finish(o,bronze,.004)
    elif o.name.startswith('Bed'):finish(o,linen,.07)

def piece(name,x1,y1,x2,y2,z,h,m,bevel=.02):return finish(box(name,x1,y1,x2,y2,z,h,m),m,bevel)
def beam(name,a,b,r,m,vertices=8):
    d=Vector(b)-Vector(a);bpy.ops.mesh.primitive_cylinder_add(vertices=vertices,radius=r,depth=d.length,location=(Vector(a)+Vector(b))/2)
    o=bpy.context.object;o.name=name;o.rotation_euler=d.to_track_quat('Z','Y').to_euler();o.data.materials.append(m);return o
def pt(x,y,z):return (*xy(x,y),z)
# Real paving joints; physical cladding stays fixed in every view.
for bounds in [(87,78,570,243),(87,243,263,573),(537,253,571,573)]:
    x1,y1,x2,y2=bounds
    for xx in range(x1,x2,36):
        for yy in range(y1,y2,36):piece('Floor tile',xx+.3,yy+.3,min(xx+35.7,x2),min(yy+35.7,y2),.001,.009,random.choice(floorM),.003)
for i,poly in enumerate(polys[:7]):
    for a,b in zip(poly,poly[1:]):
        # Cladding on both faces is excluded on the inside; only courtyard-facing walls below.
        vertical=a[0]==b[0];line=a[0] if vertical else a[1]
        if line not in [80,720,70,580,270,530,250]:continue
        low,high=sorted((a[1],b[1]) if vertical else (a[0],b[0]))
        if vertical:side=-1 if line in [80,530] else 1
        else:side=-1 if line==70 else 1
        c=line+side*6.2
        coords=(c-.5,low,c+.5,high) if vertical else (low,c-.5,high,c+.5)
        piece('Stone facing',*coords,0,3,stoneM[0],.006)
# Sliding door jambs and tucked-back panels leave the route physically open.
for ya in [300,514]:piece('Living bronze jamb',265,ya-1,274,ya+1,.03,2.52,bronze,.005)
piece('Living bronze head',265,300,274,515,2.51,.045,bronze,.004)
for x in [337,463]:piece('Dining bronze jamb',x-1,245,x+1,255,.03,2.52,bronze,.004)
piece('Dining bronze head',336,245,464,255,2.51,.045,bronze,.004)
for y in range(445,510,3):piece('Oak sliding screen',266,y,269,y+1.8,.05,2.42,oak,.003)
# Linen seating: separate cushions and rounded upholstery rather than boxes.
piece('Sofa timber plinth',100,355,146,498,.10,.16,oak,.04)
piece('Sofa back',100,355,111,498,.26,.57,linen,.09)
for y in [358,404,451]:
    piece('Seat cushion',110,y,146,y+44,.26,.19,linen,.08)
    piece('Back cushion',109,y+2,118,y+42,.42,.40,linen,.075)
for y in [355,489]:piece('Sofa arm',100,y,146,y+9,.26,.38,linen,.07)
piece('Coffee table top',176,389,222,456,.37,.065,oak,.04)
for x in [180,216]:
    for y in [395,449]:piece('Coffee table leg',x,y,x+3,y+3,.025,.35,oak,.009)
piece('Book pages',183,402,202,427,.437,.045,pages,.003)
piece('Book cover',182.7,401.7,202.3,427.3,.482,.01,book,.002)
piece('Dining tabletop',360,141,495,194,.73,.07,oak,.045)
for x in [369,482]:
    for y in [149,183]:piece('Dining leg',x,y,x+4,y+4,.015,.72,oak,.012)
for y in [118,199]:
    for x in [370,412,454]:
        piece('Chair seat',x,y,x+26,y+18,.44,.055,oak,.025)
        backY=y if y==118 else y+16
        for xx in [x+2,x+23]:
            for yy in [y+2,y+15]:piece('Chair leg',xx,yy,xx+2,yy+2,.01,.45,oak,.006)
            piece('Chair back upright',xx,backY,xx+2,backY+2,.44,.36,oak,.006)
        piece('Chair back rail',x+1,backY,x+26,backY+2,.71,.10,oak,.015)
# Olive tree: branching trunk and many small fixed leaf shapes, no billboard sphere.
trunk=material('Olive bark',(.23,.21,.16),.95)
leafM=[material('Olive leaves '+str(i),c,.87) for i,c in enumerate([(.22,.28,.15),(.34,.39,.23),(.42,.45,.29)])]
root=Vector(pt(401,414,0))
def organic_branch(name,points,radii):
    vertices=[];faces=[];sides=9
    for i,(p,r) in enumerate(zip(points,radii)):
        tangent=(points[min(i+1,len(points)-1)]-points[max(0,i-1)]).normalized()
        u=tangent.cross(Vector((0,1,0))).normalized();v=tangent.cross(u)
        for j in range(sides):
            angle=j/sides*math.tau
            vertices.append(p+(u*math.cos(angle)+v*math.sin(angle))*r*(1+.10*math.sin(j*3+i)))
        if i:
            for j in range(sides):faces.append(((i-1)*sides+j,(i-1)*sides+(j+1)%sides,i*sides+(j+1)%sides,i*sides+j))
    mesh=bpy.data.meshes.new(name);mesh.from_pydata(vertices,[],faces);mesh.update()
    o=bpy.data.objects.new(name,mesh);bpy.context.collection.objects.link(o);o.data.materials.append(trunk)
    for face in mesh.polygons:face.use_smooth=True
stem=[root+Vector(p) for p in [(0,0,0),(.07,.02,.45),(-.05,.04,.9),(.12,.10,1.3),(.09,.12,1.65)]]
organic_branch('Gnarled olive trunk',stem,[.19,.165,.13,.11,.065])
leafverts=[[] for _ in leafM];leaffaces=[[] for _ in leafM]
for branch in range(7):
    ang=branch*2.399;start=stem[2 if branch%3==0 else 3]
    length=random.uniform(.65,1.25)
    end=root+Vector((math.cos(ang)*length,math.sin(ang)*length,random.uniform(2.0,2.85)))
    elbow=start.lerp(end,.48)+Vector((0,0,.18))
    organic_branch('Olive limb',[start,elbow,end],[.065,.035,.012])
    for twig in range(15):
        a=ang+random.uniform(-1.8,1.8)
        center=end+Vector((math.cos(a)*random.uniform(.15,.65),math.sin(a)*random.uniform(.15,.65),random.uniform(-.30,.45)))
        origin=elbow.lerp(end,random.uniform(.5,1))
        organic_branch('Olive twig',[origin,origin.lerp(center,.6)+Vector((0,0,.06)),center],[.013,.007,.002])
        for l in range(65):
            p=center+Vector((random.uniform(-.30,.30),random.uniform(-.30,.30),random.uniform(-.20,.20)))
            a=random.random()*math.tau;u=Vector((math.cos(a),math.sin(a),random.uniform(-.6,.6)))*random.uniform(.035,.055);v=Vector((-math.sin(a),math.cos(a),.3))*.009
            idx=random.randrange(3);vs=leafverts[idx];fs=leaffaces[idx];k=len(vs)
            vs.extend([p-u,p-u*.4+v,p+u*.4+v,p+u,p+u*.4-v,p-u*.4-v]);fs.append(tuple(k+j for j in range(6)))
for i in range(3):
    mesh=bpy.data.meshes.new('Olive leaf mesh');mesh.from_pydata(leafverts[i],[],leaffaces[i]);mesh.update();o=bpy.data.objects.new('Olive foliage',mesh);bpy.context.collection.objects.link(o);o.data.materials.append(leafM[i])
# Planting ring and individual gravel use deterministic positions.
for i in range(55):
    a=i/55*math.tau;p=root+Vector((math.cos(a)*.86,math.sin(a)*.86,.10))
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=1,radius=random.uniform(.09,.16),location=p);o=bpy.context.object;o.name='Tree stone';o.scale.z=.6;o.data.materials.append(random.choice(stoneM))
# Measured surface photographs, shared by browser and offline camera views.
# CC0 sources and retrieval instructions are in sources.json beside this script.
TEXTURES=ROOT.parent/'output/website-refresh/arcos/materials'
def pbr(m,asset,normal_strength=.55):
    nodes=m.node_tree.nodes;links=m.node_tree.links;p=nodes.get('Principled BSDF')
    for key,socket in [('Diffuse','Base Color'),('Rough','Roughness'),('nor_gl','Normal')]:
        path=TEXTURES/(asset+'-'+key+'.jpg')
        if not path.exists():continue
        im=bpy.data.images.load(str(path),check_existing=True)
        if key!='Diffuse':im.colorspace_settings.name='Non-Color'
        im.pack();tex=nodes.new('ShaderNodeTexImage');tex.image=im
        if key=='nor_gl':
            normal=nodes.new('ShaderNodeNormalMap');normal.inputs['Strength'].default_value=normal_strength;links.new(tex.outputs['Color'],normal.inputs['Color']);links.new(normal.outputs['Normal'],p.inputs['Normal'])
        else:links.new(tex.outputs['Color'],p.inputs[socket])
pbr(ground,'sandy_gravel',.8);pbr(plaster,'white_plaster_02',.25);pbr(oak,'oak_veneer_01',.4);pbr(linen,'rough_linen',.4);pbr(trunk,'bark_brown_02',.8)
for m in stoneM:pbr(m,'white_sandstone_blocks_02',.5)
# Object-space planar UVs preserve a consistent physical texture size across pieces.
for o in bpy.data.objects:
    if o.type!='MESH' or not o.data.materials:continue
    name=o.data.materials[0].name
    if name.startswith('Olive leaves'):continue
    repeat=.65 if name=='Linen' else 2.5 if name.startswith('Limestone') else 2.0
    uv=o.data.uv_layers.active or o.data.uv_layers.new()
    for face in o.data.polygons:
        axis=max(range(3),key=lambda i:abs(face.normal[i]));axes=[i for i in range(3) if i!=axis]
        for li in face.loop_indices:
            v=o.matrix_world@o.data.vertices[o.data.loops[li].vertex_index].co
            uv.data[li].uv=(v[axes[0]]/repeat,v[axes[1]]/repeat)

# Merge by material for a compact number of browser draw calls.
groups={}
for o in list(bpy.data.objects):
    if o.type=='MESH' and o.data.materials:groups.setdefault(o.data.materials[0].name,[]).append(o)
for name,objs in groups.items():
    bpy.ops.object.select_all(action='DESELECT')
    for o in objs:o.select_set(True)
    bpy.context.view_layer.objects.active=objs[0];bpy.ops.object.join();bpy.context.object.name=name
scene=bpy.context.scene;scene.render.engine='CYCLES';scene.cycles.samples=48;scene.cycles.use_denoising=True
scene.render.resolution_x=1536;scene.render.resolution_y=1024;scene.render.resolution_percentage=100
scene.world.use_nodes=True
sky=scene.world.node_tree.nodes.new('ShaderNodeTexSky');sky.sky_type='HOSEK_WILKIE';sky.sun_direction=(.4,-.5,.7)
scene.world.node_tree.links.new(sky.outputs['Color'],scene.world.node_tree.nodes['Background'].inputs[0]);scene.world.node_tree.nodes['Background'].inputs[1].default_value=.3
bpy.ops.object.light_add(type='SUN',location=(-7,-6,12));bpy.context.object.rotation_euler=(.5,-.4,-.5);bpy.context.object.data.energy=2;bpy.context.object.data.angle=.08
bpy.ops.object.camera_add();camera=bpy.context.object;scene.camera=camera;camera.data.lens=23;camera.data.clip_start=.05;camera.data.clip_end=150
scene.view_settings.view_transform='AgX'
def point(px,py,z=1.6):return (*xy(px,py),z)
def render(name,pos,target):
    camera.data.type='PERSP';camera.location=pos;camera.rotation_euler=(Vector(target)-camera.location).to_track_quat('-Z','Y').to_euler()
    scene.render.filepath=str(OUT/(name+'.png'));bpy.ops.render.render(write_still=True)
# Exact same geometry is exported, including material textures and stable objects.
camera.location=point(185,330);camera.rotation_euler=(Vector(point(285,330))-camera.location).to_track_quat('-Z','Y').to_euler()
bpy.ops.wm.save_as_mainfile(filepath=str(ROOT.parent/'output/website-refresh/arcos/spatial-study/arcos-finished-v1.blend'))
bpy.ops.export_scene.gltf(filepath=str(OUT/'house.glb'),export_format='GLB',export_cameras=False,export_lights=False)
if '--no-render' in sys.argv:
    print('MODEL_EXPORT_COMPLETE');sys.exit(0)
render('living',point(170,340),point(410,380))
render('courtyard',point(400,640,2.6),point(400,250,1.5))
render('outside',point(315,330),point(450,360))
camera.data.type='PANO';camera.data.panorama_type='EQUIRECTANGULAR';camera.location=point(185,330);camera.rotation_euler=(Vector(point(285,330))-camera.location).to_track_quat('-Z','Y').to_euler()
scene.render.resolution_x=4096;scene.render.resolution_y=2048;scene.cycles.samples=24
scene.render.filepath=str(OUT/'living-360.png');bpy.ops.render.render(write_still=True)
print('SHARED_HOUSE_COMPLETE')
