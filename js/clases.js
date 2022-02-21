class CategoriaProducto{
    constructor(id, nombreCategoria){
        this.id = id;
        this.nombreCategoria = nombreCategoria;
    }

    buscarNombreDeCategoria(){
        return this.nombreCategoria;
    }

    buscarIdCategoria(){
        return this.id;
    }
}

class Producto{
    constructor(idCategoria, id, nombreCategoria, nombre, stock, precio, imagen){
        this.idCategoria = idCategoria;
        this.id = id;
        this.nombreCategoria = nombreCategoria;
        this.nombre = nombre;
        this.stock = stock;
        this.precio = precio;
        this.imagen = imagen;
    }

    buscarCodigoProducto(){
        return this.id;
    }
}

class Proveedor{
    constructor(codProveedor, cuit, nombre, direccion, email, telf){
        this.codProveedor = codProveedor;
        this.cuit = cuit;
        this.nombre = nombre;
        this.direccion = direccion;
        this.email = email;
        this.telf = telf;
    }
}

class LoguinUsuarios{
	constructor(nombre, domicilio, email, passw){
		this.nombre = nombre;
        this.domicilio = domicilio;
        this.email = email;
		this.passw = passw;
	}
}