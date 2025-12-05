
  document.addEventListener("DOMContentLoaded", function() {
    // Load Header
    fetch("http://localhost:4000/navbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header-placeholder").innerHTML = data;
        });

    // Load Footer
   /* fetch("footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer-placeholder").innerHTML = data;
        });*/
});
