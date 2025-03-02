# Angular Course: v16, v17, v18

This repository collects all the lessons learned from the lasts three version of this framework.

- This project requires;
    - Install a correct node version (20.12.0)

    - Install angular cli locally:
        ```
        npm install @angular/cli@17.3.3
        ```
    

## Angular v16

### Init a new project
```
ng new <project_name> --standalone false
```

**NOTE**: If you are in a previous version than 17 is not neccessary the flag

### Create a new component, service or module

We can create a component manually but we can instead use de angular CLI:

```
ng generate component <component_name>
```

Or we can use a short version

```
ng g c <component_name>
```

### Production building

```
npm run build
```

### Lazy load mocule creation

Example of a module with component creation and implementation of the lazy load et the app-routing module

```
ng g m <module_name> --module app --route <route_name>
```

- Example:

```
ng g m products --module app --route products
```