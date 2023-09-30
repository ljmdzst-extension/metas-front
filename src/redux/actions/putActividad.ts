export const  guardarActividad = (dato: any) => {
    fetch("http://168.197.50.94:4005/metas/v2/actividad", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dato),
    })
      .then((resp) => resp.json())
      .then((data) =>
        data.ok ? alert("actividad guardada !") : alert(data.error)
      )
      .catch((error) => alert(JSON.stringify(error)));
  };