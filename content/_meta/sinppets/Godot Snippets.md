Create timer
```
yield(get_tree().create_timer(reload_rate), "timeout")
```

Spawn object
```
func spawn_bullet_hole():
	var instance = BULLET_HOLE.instance()
	instance.global_transform.origin = global_transform.origin
	get_node("/root/World").add_child(instance)
```