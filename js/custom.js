$(document).ready(function () {
    getAllPosts();
    $('#loader').hide();
    $('#success').hide();
});


function getAllPosts(){
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json()) 
        .then((posts) => {
            let mockup = ``;

            posts.forEach(element => {
                let newData = 
                    `
                    <tr>
                        <th scope="row">${element.id}</th>
                        <td>${element.title}</td>
                        <td>${element.body}</td>
                        <td>
                            <button type="button" onclick="viewPost(${element.id})" class="btn btn-sm btn-success">View</button>
                        </td>
                    </tr>
                    `
                    mockup += newData
            });

            document.getElementById('tablebody').innerHTML = mockup
            $('#myTable').DataTable();
    });
}

function viewPost(id){
    disableInput()
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((response) => response.json())
        .then((post) => {
            $('#exampleFormControlInput1').val(post.title)
            $('#exampleFormControlTextarea1').val(post.body)
            $('#productModal').modal('show');
        })   
}

function addPost(){
    $('#addProductModal').modal('show')
}

function savePost(){
    $('#loader').show()
    let postTitle = $('#addPostTitle').val()
    let postbody = $('#addPostBody').val()

    let data = {
        title: postTitle,
        body: postbody,
        userId: 1
    }

    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    .then((response) => response.json())
    .then(jsonResponse => {
        cleanUp()
    })
}

function cleanUp(){
    $('#success').show();

    $('#loader').hide()
    resetForm()

    setTimeout(() => {
        $('#success').hide();
    }, 3000);
}

function disableInput(){
    $("#titleInput input").prop("disabled", true);
    $("#bodyInput textarea").prop("disabled", true);
}

function resetForm(){
    $('#addPostTitle').val("")
    $('#addPostBody').val("")

    $('#addProductModal').modal('hide')
}