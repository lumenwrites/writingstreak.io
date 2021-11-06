# Introduction to Godot - Create your first Game in 1 hour.

[[01 Introduction]]
[[Godot UI]]
[[Nodes and Scripts]]
[[Project Overview]]
[[Initial Setup and Preferences]]

 # Physics bodies
 New scene, kinematic body.
 Rename sprite to Sprite.
 Godot can automatically do some physics for you.
 There are 3 main types of physics bodies.
 Static, Kinematic, Physics.
 Static body is like a wall or floor, it interacts with other physics objects (you can bump into it), but it doesn't move.
 Rigid body is like a crate or a barrel or a ball, it moves according to the laws of physics.
 Kinematic body is the one we need - it's a player. You control it manually, from the keyboard, and yet it can interact with physics objects, like bump into walls or push crates.

 [Bodies demo.]

 # Collision shape

 Create kinematic body, add the sprite.
 It shows an error - you need a collision shape.
 Sprite is just art, a drawing, it visually represents the player.
 Collision shape is the simplified shape that will be used for physics, like bumping into walls.

 Save player to Player folder.
 Link it to the world.
 Now whenver you change the player it'll automatically update.
 (it's like importing in java).


 Now if you run the game, you see a player in it.

** Simple movement
 Add a script to Player. Set template to no comments.
 You can attach scripts to nodes, that's where you wriet the code that tells them what to do.

 Physics process runs every frame and updates position.
 That's how all of games work - most of the code you're writing describes how the state of the game changes from frame to frame.
 ```
 func _physics_process(delta):
	 position.x += 1
```

** [TODO Vector explainer]


https://docs.godotengine.org/en/stable/tutorials/math/vector_math.html
It even has a reflection!

 Let's make it a bit more interesting, let's make him bounce off the walls.
 Position of the player is represented as a vector, that's just his coordinates.
 Velocity is how position changes every frame. So every time I'm adding this vector to player's position.
 By changing velocity, I can change how the player moves.

 ```
var vel = Vector2(250, 0)

func _physics_process(delta):
 position += vel*delta
	

	 if position.x > OS.get_window_size().x or position.x < 0:
		 vel *= -1

```

 Generally speaking, you control the player by changing his velocity.
 So position updates every frame automatically, and velocity describes how the player will move.

 Make it run in circles:
 ```
vel = vel.rotated(0.05)
```

 Make it slow down:
 ```
vel *= 0.99
```


## Control with keyboard
 Define keys in prefs. Up, down, left, right.

 ```
 var speed = 150
 var friction = 0.85
 var vel = Vector2()

 func _physics_process(delta):
	 if Input.is_action_pressed("right"):
		 vel.x += speed
	 if Input.is_action_pressed("left"):
		 vel.x -= speed
	 if Input.is_action_pressed("up"):
		 vel.y -= speed
	 if Input.is_action_pressed("down"):
		 vel.y += speed
	

	 position += vel*delta
	 vel *= friction	

```

 So we're changing velocity when we press keys, we add it to position,
 and we add friction so that it slows down.

 Make him point in the opposite direction:
 ```
$Sprite.flip_h = vel.x < 0
```

** Add walls
 Static body, sprite, collision shape, link into scene, scale.
 Rotate, with ctrl.

 But the player still ignores the walls, because we're just telling him how to move and it does. So instead of `position += vel*delta` we want to use
 ```
vel = move_and_slide(vel)
```

 It's a function that comes with godot. It knows when collision happened, so when the player bumps into the wall, it'll set velocity to zero.
 Notice that I'm not using delta here, it takes delta into account automatically.
 It's move and slide because if I rotated the wall and pressed move right, now it would
 slide against it.

** Tileset
 Now let's do the walls correctly.
 Create tileset, drag the sprite, create a new tile.
 Enable snapping, draw square for square tile, draw polygon for rectangle.
 Now we can draw levels if we want.
 a/s ([]?) rotate
 shift+ctrl delete
 Delete the walls.

* Ghosts
  ** Create ghost
  Create ghost (KinematicBody) with collision shape, save into Enemies.
  Add script.

```
var speed = 350
var vel = Vector2(250, 250)
	
func _physics_process(delta):
	var collision = move_and_collide(vel * delta)
	if collision:
		vel = vel.bounce(collision.normal)
		var reflect = collision.remainder.bounce(collision.normal)
		move_and_collide(reflect)

	$Sprite.flip_h = vel.x < 0

```

This is similar to player, except we'll use move_and_collide function.
When the ghost collides with something, it will return us a collision object with a bunch of information on it.

Look at the illustration. To make the object bounce off the wall, we want to update it's new velocity to be at the same angle from the normal:
https://docs.godotengine.org/en/stable/tutorials/math/vector_math.html#reflection

Luckily, godot already gives us collision.normal, and .bounce function that will calculate the correct angle for us.

By the way, handy tip - press ctrl and click on the function.
It will take you to the list of all the available functions and their descriptions. I hope this blows your mind, because it's SUPER convenient.

click on move and collide, read description, click on collision it returns, and here's the list of all the stuff available on it. It's fucking awesome.

# Randomize initial velocity

Now we want for the ghost to move in random directions. That way every time we spawn a ghost,
```
func _ready():
	randomize()
	var random_speed_x = rand_range(-speed,speed)
	var random_speed_y = rand_range(-speed,speed)
	vel = Vector2(random_speed_x,random_speed_y)
```

# Game restart on collision

Player:
```
func take_damage():
	get_tree().reload_current_scene()
```
Ghost:
```
		if collision.collider is Player:
			collision.collider.take_damage()
```

** Fix player collision bug
 Fix player collision bug
 ``` 
	 var slide_count = get_slide_count()
	 if slide_count:
		 var collision = get_slide_collision(slide_count - 1)
		 if collision.collider.is_in_group("enemies"):
			 take_damage()
```

** Fix jittering bug
Show them how to print things out.

** Make the ghost glow
** Spawning Ghosts

# Create portal

Position 2D, sprite.
Add timer, call it spawn timer.
Wait time 4 seconds, autostart on.
Save to environment, add to the world (to the bottom, next to texture rect).

Adds script.
Connect timer timeout signal to portal.
[TODO explain siganls]
It's a way to pass information between different nodes.
Now every 4 seconds this function is going to run.


# Animation

Rename portal sprite to Sprite
Add animation player.
Animation > New > Spin
zoom out
top right number (animation length) - 15
click on sprite. key 0, key 360
top right button - animaiton looping

In portal:
```
func _ready():
	$AnimationPlayer.play("Spin")
```

# Ghost spawn animation

add animation player
new Spawn animation
length 0.5
sprite scale to 0, then to 1

* Coins

** Create coin
Learn new powerful node, Area2D.
It's useful for detecting whenever something, for example a player, enteres an area. You can use it to create weapon and health pickups, to create like a ladder or a trampoline or a door you can activate, or, in this case, coins.
area 2d, collider, sprite.

Audio stream player with coin sound.
rename it to CoinSound

save to Environment adn add it to the level.
make sure it's under player and ghost, right after portal

(add move coin on ready too?)
```
func _on_Coin_body_entered(body):
	if body is Player:
		$CoinSound.play()
		move_coin()

func move_coin():
	var margin = 64+16
	var pos_x = rand_range(margin, OS.get_window_size().x - margin)
	var pos_y = rand_range(margin, OS.get_window_size().y - margin)
	var random_pos = Vector2(pos_x,pos_y)
	global_position = random_pos
```
save, create script, connect on body entered signal

* UI
  ** Score HUD
  New CanvasLayer scene, save to UI folder.
  The CanvasLayer node lets us draw our UI elements on a layer above the rest of the game, so that the information it displays isn't covered up by any game elements like the player or mobs.


Give them the outline of the course.
We'll make a player, we'll make ghosts, we'll spawn ghosts, we'll make coins, we'll make score and hud, we'll make game over screen.

add label, rename it to score. default value 0.
custom fonts, new dynamic font, font tab, drag font to font data.
settings size 32
margin top -20

add to world

# create globals
Now we need to create a global variable, one that can be accessed from anywhere. We're doing this because we want the score to be accessible from hud, that way we can increment it, but also from end game screen.

Globals.gd
```
var score = 0
```

Project settings, auto load, Globals.gd, node name G, add.
Now we can access all the variables on it from anywhere.


Create HUD script, this function will increment the global variable, and also update the text in the text label.
```
func increment_score():
	G.score += 1
	$Score.text = str(G.score)
```

Finally, in the coin script, we can add this to on body entered:
```
func _on_Gold_body_entered(body):
	if body is Player:
		$CoinSound.play()
		$"../HUD".increment_score()
		move_coin()
```

So we're running this function on the hud, and it increments score.

** Game Over Screen
 Control node, name GameOver.
 texturerect, stretch mode - scale, layout - full rect.
 large gold sprite.
 right click - merge from scene - import score label node from HUD

 textrue button, textures, normal - button.png
 duplicate label, parent to button.
 dynamic font - make unique
 custom fonts > dynamic font > size 24
 text align center

 audiostream player, name gameover sound.
 haunting sound.

Modify player take_damage() script to take you to game over screen instead of restarting the game:
```
func take_damage():
	get_tree().change_scene("res://UI/GameOver.tscn")
```

 connect restart button pressed
 add a spacebar "restart" key 
 ```
func _ready():
	$Score.text = str(G.score)
	$GameoverSound.play()

func _input(event):
	if Input.is_action_just_pressed("restart"):
		restart_game()
		
func _on_RestartButton_pressed():
	restart_game()
	
func restart_game():
	G.score = 0
	get_tree().change_scene("res://Environment/World.tscn")
```

# Doing UI correctly

Center container for the center column
Vbox to keep them all vertical
hbox for texture rect and score label.
margin container for restart button.
magrin container, custom constants, margin top.

# Finally, add music

AudioStreamPlayer, name music, lonely witch, autoplay on.


* //Exporting?
  HTML5, netlify.
  Editor > Manage export templates.
  Project > Export.
  Add > HTML5
  Name - ghost runner
  select folder Out/GhostRunnerHTML5/index.html

coin spawn:
```
	var pos_x = rand_range(margin, OS.get_window_safe_area().size.x - margin)
	var pos_y = rand_range(margin, OS.get_window_safe_area().size.y - margin)
```
get_viewport_rect().size could be more appropriate though, depending on what you're trying to do.

Open in terminal.
git init
.gitignore - .import
in root folder?
git remote add origin git@github.com:lumenwrites/GhostRunner.git
git add -A && git commit -m "Update" && git push origin master

add project to netlify
publish directory Out/GhostRunnerHTML5
project settings > window > stretch mode > 2d
aspect > keep
run the GameOver scene, so that you have to click on start.

gotta spawn coins... within a size? just manually enter it?

* Outro
  Did you enjoy it?
  Any feedback?
  I wanna do more of these.
  Take a look at some other games we could make.
  Flappy UFO - simple, but reinforces what we've learned.
  Space shooter - more advanced.
  Simple 3D game.


* TODO



* assets
  https://opengameart.org/content/loop-lonely-witch
  open sound.org
  freesound.org

concept graph

## Godot Interface

asdfsd



## Creating a Ghost

asdfsdf



### Subsection

asdfsdf

> Quote

> Hello, this is my quote

```gdscript
extends Spatial
class_name TrailRenderer

#############################
# EXPORT PARAMS
#############################
# width
export var width: float = 0.5
export var width_curve: Curve
# length
```

# asd