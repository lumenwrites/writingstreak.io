# Introduction to Godot - Create your first Game in 1 hour.

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

![[01 Introduction]]
![[Godot UI]]
![[Nodes and Scripts]]
![[Project Overview]]
![[Initial Setup and Preferences]]

