import * as data from '../Data/wordNiveles.json';

export  function createNivelTable(db){
    db.transaction((tx) =>{
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS nivel (id INTEGER PRIMARY KEY AUTOINCREMENT, Nivel  VARCHAR(128), idNivel  INTEGER, idOpcion INTEGER, Progreso INTEGER, Evaluado BOOLEAN, Completed BOOLEAN)",
            [],
            (sqlTxn, res) => {
              //  console.log("tabla Nivel creado")
            },
            error => { console.log(error)}
        )
    })
    llenar(db)
}


export function insertNivel(db, Nivel , idNivel, idOpcion , Progreso, Evaluado, Completed){
    db.transaction((tx) => {
        tx.executeSql(
            "INSERT INTO nivel ( Nivel , idNivel, idOpcion , Progreso, Evaluado, Completed)VALUES (?,?,?,?,?,?)",
            [Nivel , idNivel, idOpcion , Progreso, Evaluado, Completed],
            (sqlTxn, res) => {
              //  console.log("nivel ingresado")
            },
            error => {console.log("no se pudo insert nivel")}
        )
    },
    null)
}

function llenar(db){
    const nivel = data.Niveles
    
    nivel.map((item) =>{ 
            insertNivel(db, item.Nivel, item.idNivel, item.idOpcion, item.Progreso, false, false)
        }
    )
      
} 

export  function  getNivels(db, opcion, setNivels){
    db.transaction((tx) => {
        tx.executeSql(
            `SELECT * FROM nivel`,
            [],
            (sqlTxn, res) => {
                //console.log("niveles obtenidos");
                let len  = res.rows.length;
                if(len > 0){
                    let results =[]
                    for(let i =0; i<len; i++){
                        let item =   res.rows.item(i);
                        //console.log(item)
                        results.push({id: item.id, Nivel:item.Nivel, idNivel: item.idNivel, idOpcion: item.idOpcion, Progreso: item.Progreso, Evaluado:item.Evaluado, Completed: item.Completed})
                    }  
                    //console.log(results)
                    setNivels(results)
                    //return results;
                }else{
                    console.log("no hay nivel")
                }
            },
            error => {console.log(error)}
        )
    }
    )
}

export function updateNivel(db, id,Progreso){
     
    db.transaction((tx) => {
        tx.executeSql(
            `UPDATE nivel set Progreso = Progreso +  '${Progreso}' where id = '${id}'`,
            [],
            (sqlTxn, res) => {
                console.log("nivel alterado:",Progreso, id)
            },
            error => {console.log("no se pudo alterar nivel: ",Progreso, id)}
        )
    },
    null) 
}



export function evaluatedNivel(db, id,Evaluado){
    db.transaction((tx) => {
        tx.executeSql(
            `UPDATE nivel set Evaluado = '${Evaluado}' where id = '${id}'`,
            [],
            (sqlTxn, res) => {
                console.log("nivel evaluado:",Evaluado, id)
            },
            error => {console.log("no se pudo Evaluated nivel: ",Evaluado, id)}
        )
    },
    null)
}

export function completedNivel(db, id,Completed){
    db.transaction((tx) => {
        tx.executeSql(
            `UPDATE nivel set Completed = '${Completed}' where id = '${id}'`,
            [],
            (sqlTxn, res) => {
                console.log("nivel Completed:",Completed, id)
            },
            error => {console.log("no se pudo Completed nivel: ",Completed, id)}
        )
    },
    null)
}

export  function  getProgreso(db, id, setProgreso){
    db.transaction((tx) => {
        tx.executeSql(
            `SELECT * from nivel
                    where id = '${id}'`,
            [],
            (sqlTxn, res) => {
                const item = res.rows.item(0)
                setProgreso(item.Progreso) 
                console.log(item.Progreso)
                //console.log(res.rows.item(0).Nombre)
            },
            error => {console.log("no se pudo obtener el progreso del nivel", id)}
        )
    }
    )
}

export  function  getEvaluado(db, id, setEvaluado){
    db.transaction((tx) => {
        tx.executeSql(
            `SELECT * from nivel
                    where id = '${id}'`,
            [],
            (sqlTxn, res) => {
                const item = res.rows.item(0)
                setEvaluado(item.Evaluado) 
                console.log("db evaluado",item.Evaluado)
                //console.log(res.rows.item(0).Nombre)
                //return item.Evaluado;
            },
            error => {console.log("no se pudo obtener el Evaluado del nivel", id)}
        )
    }
    )
}