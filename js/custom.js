
$(document).ready(function () {
    let name = 'Group3 rocks!'
    getAllPosts(name, age = 5, color = 'yellow');
});


function getAllPosts(name, age, color){
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

            console.log(name)
            console.log(age)
            console.log(color)
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

function disableInput(){
    $("#titleInput input").prop("disabled", true);
    $("#bodyInput textarea").prop("disabled", true);
}