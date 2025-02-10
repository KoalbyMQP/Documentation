fetch('/pages/nav-bar.html')
            .then(response => response.text())
            .then(navbar => {
                document.getElementById('navbar-placeholder').innerHTML = navbar;
            })
            .catch(error => console.error(error));