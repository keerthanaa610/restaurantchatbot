# Main Menu
Desktop style main menu in React. 

![Screenshot](https://raw.github.com/nathanial/main-menu/master/docs/Main Menu Screenshot.png)

## Install
```
npm install main-menu
```

## Usage
```jsx
<MenuBar ref="menuBar">
  <MenuItem label="File">
    <MenuItem label="New" icon="empty.png" shortcut="Ctrl+N" onClick={this._onNew}></MenuItem>
    <MenuItem label="Open..." icon="open.png" shortcut="Ctrl+O" onClick={this._onOpen}></MenuItem>
    <MenuItem label="Open Recent">
      <MenuItem label="File 1"></MenuItem>
      <MenuItem label="File 2"></MenuItem>
      <MenuItem label="File 3"></MenuItem>
      <MenuItem label="File 4"></MenuItem>
    </MenuItem>
  </MenuItem>
</MenuBar>
```
