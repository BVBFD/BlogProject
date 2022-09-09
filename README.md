<hr>

# My Portfolio Blog Site Ver 2.0
<br>
This is the second version of my blog portfolio.
<br>
For making this project, I used HTML, CSS, JavaScript, React, NodeJS, MongoDB, Nginx, Hostinger VPS
<br>
While coding this blog project, I could learn lots of things.
<br>
I could experience all process of web-programming from front-end to back-end, deployment as well.

<br>
<br>

<hr>

### Implement Global State Admin without Redux or Redux Toolkits 

<br>
While making this blog project, I have no idea about Redux or Redux Toolkits.
<br>
And, I am even not aware of the exist of them.
<br>
<br>
So, I have no choice but to just try.
<br>
And, I could make it using just React Hooks APIs.
<br>
<br>
I used useContext(), useReducer() and declared reducer functions.
<br>
To send state data globally, I used Context.Provider as well.
<br>
<br>

- context.jsx

```JavaScript

import {
  createContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useReducer,
  useState,
} from 'react';
import Reducer from './reducer.js';

const initialLoginData = {
  id: JSON.parse(localStorage.getItem('id')) || null,
  // token: JSON.parse(localStorage.getItem("token")) || null,
  editable: localStorage.getItem('editable') || null,
  profilePic: localStorage.getItem('profilePic') || null,
  email: localStorage.getItem('email') || null,
};


export const Context = createContext(initialLoginData);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialLoginData);

  useEffect(() => {
    localStorage.setItem('id', JSON.stringify(state.id));
    // localStorage.setItem("token", JSON.stringify(state.token));
    localStorage.setItem('editable', state.editable);
    localStorage.setItem('profilePic', state.profilePic);
    localStorage.setItem('email', state.email);
  }, [state.id]);

  return (
    <Context.Provider
      value={{
        id: state.id,
        // token: state.token,
        editable: state.editable,
        profilePic: state.profilePic,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};

```

<hr>

- reducer.js

```JavaScript
const Reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        id: action.payload.userId,
        // token: action.payload.token,
        editable: action.payload.editable,
        profilePic: action.payload.profilePic,
        email: action.payload.email,
      };

    case "LOGOUT":
      return {
        id: null,
        // token: null,
        editable: null,
        profilePic: null,
        email: null,
      };

    default:
      return state;
  }
};

export default Reducer;

```

<hr>

- index.js

```JavaScript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ContextProvider } from './context/context';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <App />
      </ContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

```

<hr>

- Login Component

```JavaScript
import React, { useContext, useRef, useState } from 'react';
import Header from '../../components/header/Header';
import { Context } from '../../context/context.js';
import styles from './Login.module.css';
import axiosInstance from '../../config';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { id, dispatch } = useContext(Context);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const idRef = useRef();
  const pwdRef = useRef();
  const navigate = useNavigate();

  const onLogin = async (event) => {
    event.preventDefault();
    try {
      const res = await axiosInstance.post(`/loginDatas/login`, {
        userId: idRef.current.value,
        password: pwdRef.current.value,
      });

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          userId: res.data.sendLoginData.userId,
          profilePic: res.data.sendLoginData.profilePic,
          editable: res.data.sendLoginData.editable,
          email: res.data.sendLoginData.email,
        },
      });
    } catch (err) {
      window.alert(err);
    }
    setLoginSuccess(true);
  };

  navigate('/');

  return (
    <>
      <Header />
      <form className={styles.loginBox} onSubmit={onLogin}>
        <div>
          <span>Login</span>
        </div>
        <div className={styles.idBox}>
          <span>ID</span>
          <input
            ref={idRef}
            type='text'
            autoFocus
            placeholder='Enter your ID'
          />
        </div>
        <div className={styles.pwdBox}>
          <span>Password</span>
          <input
            ref={pwdRef}
            type='password'
            placeholder='Enter your password'
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </>
  );
};

export default Login;

```

<hr>

### Login, Posts and Sidebar
<br>
You can browser through my blog websites like below
<br>
And I tried to focus on implementing paginating with React.
<br>
I used React-Pagination module to implement it.
<br>
<br>

![blog](https://user-images.githubusercontent.com/83178592/189166737-645a1265-1d2a-4f2d-b1f4-d2717a56bca1.gif)


<hr>

### Upload Post including Image and Video materials
<br>
I implemented uploading pictures or videos.
<br>
Everytime uploading pictures or videos, it is sent to the cloudinary storage.
<br>
And then, get URL of it, it can be shown on blog website
<br>
<br>

![blog2](https://user-images.githubusercontent.com/83178592/189169626-916214cd-c1e8-4b79-ba57-f9693a31ad6c.gif)

<hr>
<a href="https://www.lsevina126.asia/">Go To Visit Portfolio-Website</a>

<hr>

### Deployment
<br>
I Deployed this website on Hostinger VPS( Virtual Private Server ) set by Nginx.
<br>
You can refer to how I deployed this website on Hostinger VPS on right the below.
<br>
<br>

<hr>

# Connecting to the VPS

To connect your VPS server, you can use your server IP, you can create a root password and enter the server with your IP address and password credentials. But the more secure way is using an SSH key.

## Creating SSH Key

### For MAC OS / Linux / Windows 10 (with openssh)

1. Launch the Terminal app.
2. `ssh-keygen -t rsa`
3. Press `ENTER` to store the key in the default folder /Users/lamadev/.ssh/id_rsa).

4. Type a passphrase (characters will not appear in the terminal).

5. Confirm your passphrase to finish SSH Keygen. You should get an output that looks something like this:

```Your identification has been saved in /Users/lamadev/.ssh/id_rsa.
Your public key has been saved in /Users/lamadev/.ssh/id_rsa.pub.
The key fingerprint is:
ae:89:72:0b:85:da:5a:f4:7c:1f:c2:43:fd:c6:44:30 lamadev@mac.local
The key's randomart image is:
+--[ RSA 2048]----+
|                 |
|         .       |
|        E .      |
|   .   . o       |
|  o . . S .      |
| + + o . +       |
|. + o = o +      |
| o...o * o       |
|.  oo.o .        |
+-----------------+
```

6. Copy your public SSH Key to your clipboard using the following code:
   `pbcopy < ~/.ssh/id_rsa.pub`

### For Windows

1. Download PuTTY and PuTTYgen.
2. Open up PuTTYgen and click the `Generate`.
3. Copy your key.
4. Enter a key passphrase and confirm.
5. Save the private key.

## Connection

After copying the SSH Key go the to hosting service provider dashboard and paste your key and save. After,

### For MAC OS / Linux

```bash
ssh root@<server ip address>
```

### For Windows

1. Open the PuTTY app.
2. Enter your IP address.
3. Open the following section:
   Connection - SSH - Auth
4. Browse the folders and choose your private key.

## First Configuration

### Deleting apache server

```
systemctl stop apache2
```

```
systemctl disable apache2
```

```
apt remove apache2
```

to delete related dependencies:

```
apt autoremove
```

### Cleaning and updating server

```
apt clean all && sudo apt update && sudo apt dist-upgrade
```

```
rm -rf /var/www/html
```

### Installing Nginx

```
apt install nginx
```

### Installing and configure Firewall

```
apt install ufw
```

```
ufw enable
```

```
ufw allow "Nginx Full"
```

```
ufw allow from [Your Internet IP address]
```

## First Page

#### Delete the default server configuration

```
 rm /etc/nginx/sites-available/default
```

```
 rm /etc/nginx/sites-enabled/default
```

#### First configuration

```
 nano /etc/nginx/sites-available/netflix
```

```
server {
  listen 80;

  location / {
        root /var/www/netflix;
        index  index.html index.htm;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        try_files $uri $uri/ /index.html;
  }
}

```

```
ln -s /etc/nginx/sites-available/netflix /etc/nginx/sites-enabled/netflix

```

##### Write your fist message

```
nano /var/www/netflix/index.html

```

##### Start Nginx and check the page

```
systemctl start nginx
```

##### When you meet "state: degraded" in "systemctl status"

```
systemctl reset-failed
```

## Uploading Apps Using Git

```
apt install git
```

```
mkdir netflix
```

```
cd netflix
```

```
git clone <your repository>
```

## Nginx Configuration for new apps

```
nano /etc/nginx/sites-available/netflix
```

```
location /api/ {
        proxy_pass http://45.90.108.107:8800;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
  }
```

##### If you check the location /api you are going to get "502" error which is good. Our configuration works. The only thing we need to is running our app

```
apt install nodejs
```

```
apt install npm
```

```
cd api
```

```
npm install
```

```
nano .env
```

##### But If you encounter some errors because of old nodejs or npm version, you have to install the recent version of them

```
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
( You can change the another version number from 18 to any version number )
```

```
sudo apt-get install -y nodejs
( It installs npm as well )
```

##### Copy and paste your env file

```
node index.js
```

#### But if you close your ssh session here. It's gonna kill this process. To prevent this we are going to need a package which is called `pm2`

```
npm i -g pm2
```

Let's create a new pm2 instance

```
pm2 start --name api index.js
```

```
pm2 startup ubuntu
```

When you delete and stop pm2 operation

```
pm2 delete <app_name>
```

When you check the status of pm2 operation

```
pm2 status
```

## React App Deployment

```
cd ../client
```

```
nano .env
```

Paste your env file.

```
npm i
```

Let's create the build file

```
npm run build
```

Right now, we should move this build file into the main web file

```
rm -rf /var/www/netflix/*
```

```
mkdir /var/www/netflix/client
```

```
cp -r build/* /var/www/netflix/client
```

Let's make some server configuration

```
 location / {
        root /var/www/netflix/client/;
        index  index.html index.htm;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        try_files $uri $uri/ /index.html;
  }

```

### Adding Domain

1 - Make sure that you created your A records on your domain provider website.

2 - Change your pathname from Router

3 - Change your env files and add the new API address

4 - Add the following server config

```
server {
 listen 80;
 server_name safakkocaoglu.com www.safakkocaoglu.com;

location / {
 root /var/www/netflix/client;
 index  index.html index.htm;
 proxy_http_version 1.1;
 proxy_set_header Upgrade $http_upgrade;
 proxy_set_header Connection 'upgrade';
 proxy_set_header Host $host;
 proxy_cache_bypass $http_upgrade;
 try_files $uri $uri/ /index.html;
}
}

server {
  listen 80;
  server_name api.safakkocaoglu.com;
  location / {
    proxy_pass http://45.90.108.107:8800;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    }
}

server {
  listen 80;
  server_name admin.safakkocaoglu.com;
  location / {
    root /var/www/netflix/admin;
    index  index.html index.htm;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    try_files $uri $uri/ /index.html;
  }
}
```

## SSL Certification

```
apt install certbot python3-certbot-nginx
```

Make sure that Nginx Full rule is available

```
ufw status
```

```
certbot --nginx -d example.com -d www.example.com
```

Let’s Encrypt’s certificates are only valid for ninety days. To set a timer to validate automatically:

```
systemctl status certbot.timer
```
