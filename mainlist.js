

window.addEventListener('load', () => {
    const form = document.querySelector('#new-task-form');
    const input = document.querySelector('#new-task-input');
    const list_el = document.querySelector('#tasks');

    loadTasks();

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value;
        const date = new Date().toLocaleString(); // 📅🕒 التاريخ + الوقت 

        if (!task) {
            alert('Please Fill Out The Task');
            return;
        }

        const taskData = { text: task, date: date };

        const task_el = createTaskElement(taskData);
        list_el.appendChild(task_el);

        saveTasks();
        input.value = '';
    });

    function createTaskElement(taskData) {
        const task_el = document.createElement('div');
        task_el.classList.add('task');

        const task_content_el = document.createElement('div');
        task_content_el.classList.add('content');

        const task_input_el = document.createElement('input');
        task_input_el.classList.add('text');
        task_input_el.type = 'text';
        task_input_el.setAttribute('readonly', 'readonly');
        task_input_el.value = taskData.text;

        const task_date_el = document.createElement('small');
        task_date_el.classList.add('task-date');
        task_date_el.innerText = `📅 ${taskData.date}`;

        task_content_el.appendChild(task_input_el);
        task_content_el.appendChild(task_date_el);
        task_el.appendChild(task_content_el);

        const task_btn_el = document.createElement('div');
        task_btn_el.classList.add('actions');

        const task_edit_el = document.createElement('button');
        task_edit_el.classList.add('edit');
        task_edit_el.innerHTML = 'Edit';

        const task_delete_el = document.createElement('button');
        task_delete_el.classList.add('delete');
        task_delete_el.innerHTML = 'Delete';

        task_btn_el.appendChild(task_edit_el);
        task_btn_el.appendChild(task_delete_el);
        task_el.appendChild(task_btn_el);

        // Edit task
        task_edit_el.addEventListener('click', () => {
            if (task_edit_el.innerText.toLowerCase() == 'edit') {
                task_input_el.removeAttribute('readonly');
                task_input_el.focus();
                task_edit_el.innerText = 'Save';
            } else {
                task_input_el.setAttribute('readonly', 'readonly');
                task_edit_el.innerText = 'Edit';
                saveTasks();
            }
        });

        // Delete task
        task_delete_el.addEventListener('click', () => {
            task_el.remove();
            saveTasks();
        });

        return task_el;
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.task').forEach(taskEl => {
            const text = taskEl.querySelector('.text').value;
            const date = taskEl.querySelector('.task-date').innerText.replace('📅 ', '');
            tasks.push({ text, date });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const task_el = createTaskElement(task);
            list_el.appendChild(task_el);
        });
    }
});
