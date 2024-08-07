import ToDo from '../models/toDo-model.js'

//Traer lista de tareas del usuario
export const getTodo = async (req, res) => {
    const toDos = await ToDo.find({
        user: req.user.id,
    }).populate('user');
    res.json(toDos);
}

// Ver una sola To Do
export const getTodoOne = async (req, res) => {
    const toDO = await ToDo.findById(req.params.id);
    if(!toDO) return res.status(404),json({message: 'To Do not found'})
    res.json(toDO)
}

// Peticion para crear una To Do
export const createTodo = async (req, res) => {
    const {nametodo, description, completed} = req.body;
    const newTodo = new ToDo({
        nametodo,
        description,
        completed,
        user: req.user.id,
    });
    const savedTodo = await newTodo.save()
    res.json(savedTodo)
}

//Eliminar To Do
export const deleteTodo = async (req, res) => {
    const toDO = await ToDo.findByIdAndDelete(req.params.id)
    if(!toDO) return res.status(404).json({message: "To Do not found"})
    return res.sendStatus(204)
}

// Actualizar To Do
export const updateTodo = async (req, res) => {
    const toDo = await ToDo.findByIdAndUpdate(req.params.id, req.bady, {new:true})
    if(!toDo) return res.status(404).json({message: "To Do not found"})
    res.json(toDo)
}