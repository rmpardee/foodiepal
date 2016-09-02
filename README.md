# foodiepal

### Project Wiki

For further documentation beyond the README, please see our wiki:
https://github.com/protolux/foodiepal/wiki

### Application Structure

```
client/
  components/
  routes/
    -routes.jsx
    -index.js
  index.js
  assets/
    img/
    css/
      [-styles.css]
      src/
        -styles.css
  views/
    -index.js
    welcome/
      -welcome.jsx
      -index.js
    header/
      -header.jsx
      -index.js
    signin/
      -signin.jsx
      -index.js
    home/
      -home.jsx
      -index.js
    sub/
      -sub.jsx
      -addsub.jsx
      -index.js
    detail/
      -category.jsx
      -subcategory.jsx
      -entry.jsx
      -addentry.jsx
      -index.js
server/
  server.js
  config/
    -helpers.js
    -middleware.js
    -utils.js
  db/
    -db.js
  food/
    -foodController.js
    -foodModel.js
    -foodRoutes.js  
  user/
    -userController.js
    -userModel.js
    -userRoutes.js
tests/
  client/
    -client_spec.js
  server/
    -server_spec.js
    -api_spec.js    
node_modules/
README.md
package.json
```


GET    => READ
POST   => CREATE
DELETE => DELETE
PUT    => UPDATE