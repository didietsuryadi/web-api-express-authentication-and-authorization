var app = new Vue({
      el: '#root',
      data: {
        username: '',
        password: '',
        email: '',
        usernameattr: '',
        users:[]
      },
      methods: {
        login: function (e) {
          e.preventDefault()
          $.ajax({
            url: "http://localhost:3000/login",
            type: "POST",
            data: {
              username: app.username,
              password: app.password,
            },
            success:function (data) {
              console.log(data);
              if(data.token){
                localStorage.setItem('token', data.token)
                app.usernameattr = data.username
                window.location.href = 'http://127.0.0.1:8080/home.html'
              }else{
                alert("no authorize")
              }
              app.resetButton()
            }
          })
        },
        register: function(e) {
          e.preventDefault()
          $.ajax({
            url: "http://localhost:3000/register",
            type: "POST",
            data: {
              username: app.username,
              password: app.password,
              email: app.email
            },
            success:function (data) {
              if(data.username == app.username){
                alert("account already created, please login")
              }
              app.resetButton()
            }
          })
      },
      logout: function () {
        localStorage.removeItem('token')
        window.location.href = 'http://127.0.0.1:8080/index.html'
      },
      getData: function () {
        $.ajax({
          url: "http://localhost:3000/user",
          beforeSend: function(request) {
            request.setRequestHeader("token", localStorage.getItem("token"));
          },
          type: 'get',
          success: function(result) {
            app.users = result
          }
        });
      },
      getUser: function () {
        $.ajax({
          url: "http://localhost:3000/userOnline",
          beforeSend: function(request) {
            request.setRequestHeader("token", localStorage.getItem("token"));
          },
          type: 'get',
          success: function(result) {
            app.usernameattr = result.username
          }
        });
      },
      resetButton: function() {
        app.username = ''
        app.password = ''
        app.email = ''
      }
    }
})

app.getData()
