var app = new Vue({
      el: '#root',
      data: {
        username: '',
        password: '',
        email: ''
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
                window.location.href = 'http://127.0.0.1:8080/dashboard.html'
              }else{
                alert(data.message)
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
      resetButton: function() {
        app.username = ''
        app.password = ''
        app.email = ''
      }
    }
})
