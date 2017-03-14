if(!localStorage.getItem('token')){
  window.location.href = 'http://127.0.0.1:8080/login.html'
}else{
  $('#homeBody').show()
};
