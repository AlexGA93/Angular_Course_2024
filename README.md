# Angular Course: v16, v17, v18

This repository collects all the lessons learned from the lasts three version of this framework.

## Angular v16

### Init a new project
```
ng new <project_name> --standalone false
```

**NOTE**: If you are in a previous version than 17 is not neccessary the flag

### Create a new component

We can create a component manually but we can instead use de angular CLI:

```
ng generate component <component_name>
```

Or we can use a short version

```
ng g c <component_name>
```