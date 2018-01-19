function initTodo (app, io) {
    // Loading our /todo route
    // Will simply load the page with all todos in our precious array
    app.get('/todo', function(req, res, next) {
        res.render('todo/todo', {todos: app.todos})
    })
    
    // Loading our /todo/add route in GET method
    // We don't want people getting this page, so we'll redirect them on the homepage
    app.get('/todo/add', function(req, res, next) {
        res.redirect('/todo')
    })

    // Loading our /todo/add route in POST method
    // Will manage all "add" actions in our very important array
    // Also send the good request with the sockets to reload all client todo-lists
    app.post('/todo/add', function(req, res, next) {
        var todo = req.body.todo

        // Just to prevent some failure, impossible is nothing
        if(todo) {
            // Adding the new todo in this marvelous array
            app.todos.push(todo)
            // Sending the request to all client on /todo page to refresh their todo-lists
            io.of('/todo/add/').emit('todo_added', todo, app.todos.indexOf(todo))
            // Just some useless memory releasing
            todo = false
        }
        // Do I really have to comment this line ?
        res.redirect('/')
    })
    
    // Loading our /todo/delete route
    // Will manage all "deletion" actions in our amazing array
    // Also send the good request with the sockets to reload all client todo-lists
    app.get('/todo/delete/:id', function(req, res, next) {
        const index = req.params.id
        // Yeah, don't try to do bad things, if there's no array, there's no todo ans if there's no todo, there's no utility for this project
        if(!app.todos) {
            res.redirect('/')
        } 
        else {
            // Removing the given index in this wonderful array
            app.todos.splice(index, 1)
            // Sending the request to all client on /todo page to refresh their todo-lists
            io.of('/todo/delete/').emit('todo_deleted', index)
        }
        // Do I really have to... I won't do the same comment for this line !
        res.redirect('/todo')
    })
}

module.exports = initTodo
