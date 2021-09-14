const inquirer = require('inquirer');


// array database
let arrData = [];

// create data 
const createData = (value) => {
    let id = arrData.length + 1;
    let run = arrData.push({ id: id, value: value });
    return id;
};

// read data 
const readData = (id) => {
    let res;
    const element = arrData[id - 1];
    if (element !== undefined) {
        if (element.id == id) {
            res = element;
        } else {
            res = null;
        }
    } else {
        res = null;
    }
    return res;
};

// update data
const updateData = (id, value) => {
    let res;
    let element = arrData[id - 1];
    if (element.id == id) {
        let _upId = element.id = id;
        let _upValue = element.value = value;
        res = true;
    } else {
        res = null;
    }
    return res;
};

// delete data
const deleteData = (id) => {
    let res;
    let element = arrData[id - 1];
    if (element.id == id) {
        delete element.id;
        delete element.value;
        res = true;
    } else {
        res = null;
    }
    return res;
};

const _validateId = (input) => {
    let res;
    let _input = input.split(",")[0];
    let run = readData(_input);
    if (run != null) {
        res = true;
    } else {
        res = `id is not found`;
    }
    return res;
}

const promptSuccess = async (id, value) => {
    const _prompt = await inquirer.prompt([{
        type: "confirm",
        name: "success",
        message: `Proses success result : \n  id: ${id} \n  value: ${value} \n  press Y to back to home or press N to exit this program`
    }]);
    const _value = _prompt.success;
    if (_value) {
        await promptHome();
    } else {
        process.exit();
    }
}

const promptCreateData = async () => {
    const _prompt = await inquirer.prompt([{
        type: "input",
        name: "createdata",
        message: "Please input value data"
    }]);
    const _value = _prompt.createdata;
    if (_value) {
        let run = createData(_value);
        await promptSuccess(run, _value)
    }
}

const promptReadData = async () => {
    const _prompt = await inquirer.prompt([{
        type: "input",
        name: "readdata",
        message: "Please input id data",
        validate: _validateId
    }]);
    const _value = _prompt.readdata;
    if (_value) {
        let run = readData(_value);
        await promptSuccess(_value, run.value);
    }
}

const promptUpdateData = async () => {
    const _prompt = await inquirer.prompt([{
        type: "input",
        name: "updatedata",
        message: "Please input id data and value with format: id,value example 1,damar",
        validate: _validateId
    }]);
    const _value = _prompt.updatedata;
    const _split = _value.split(",");
    if (_value) {
        let run = updateData(_split[0], _split[1]);
        if (run === true) {
            await promptSuccess(_split[0], `change data to : ${_split[1]}`);
        } else {
            await promptSuccess(_split[0], `failed id is not found`);
        }
    }
}

const promptDeleteData = async () => {
    const _prompt = await inquirer.prompt([{
        type: "input",
        name: "deletedata",
        message: "Please input id data",
        validate: _validateId
    }]);
    const _value = _prompt.deletedata;
    if (_value) {
        let run = deleteData(_value);
        if (run === true) {
            await promptSuccess(_value, run);
        }
    }
}

var promptHome = async () => {
    console.clear();
    const _prompt = await inquirer.prompt([{
        type: "list",
        name: "home",
        message: `created by damartripamungkas\n  Welcome to learning CRUD data with array database, please select menu below`,
        choices: [
            `create data`,
            `read data`,
            `update data`,
            `delete data`,
            `read all data`
        ],
    }]);
    const _value = _prompt.home;
    if (_value == "create data") {
        await promptCreateData();
    } else if (_value == "read data") {
        await promptReadData();
    } else if (_value == "update data") {
        await promptUpdateData();
    } else if (_value == "delete data") {
        await promptDeleteData();
    } else if (_value == "read all data") {
        // console.log(arrData);
        await promptSuccess(null, JSON.stringify(arrData));
    }
}

promptHome().then()