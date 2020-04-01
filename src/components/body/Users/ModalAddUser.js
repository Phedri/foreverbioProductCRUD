import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input
} from "reactstrap";

import axios from "axios";

import "../../../css/body/AddProduct.css";

class ModalAddProduct extends Component {
  state = {
    modalNewProduct: false,
    nomCat: "",
    idCat: "",
    nom: "",
    description: "",
    source: "",
    etat: "",
    prix: "",
    qte: "",
    url:
      "https://n-allo.be/wp-content/uploads/2016/08/ef3-placeholder-image-450x350.jpg",
    nomError: "",
    descError: "",
    srcError: "",
    prixError: "",
    qteError: ""
  };

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  toggleNewProductModal = () => {
    this.setState(prevState => ({
      modalNewProduct: !prevState.modalNewProduct
    }));
  };

  handleAddProduct = e => {
    this.chooseCategory(this.state.nomCat);

    e.preventDefault();
    const isValid = this.validate();

    const {
      idCat,
      nom,
      description,
      source,
      etat,
      prix,
      qte,
      url
    } = this.state;
    if (isValid) {
      axios
        .post("http://localhost:9092/product", {
          idCat,
          nom,
          description,
          source,
          etat,
          prix,
          qte,
          url
        })
        .then(() => {
          console.log("produit ajouté");
          this.toggleNewProductModal();
          this.props.fetchProducts();
        });
      this.clearFormError();
    }
  };

  clearFormError = () => {
    this.setState({
      nomError: "",
      descError: "",
      srcError: "",
      prixError: "",
      qteError: ""
    });
  };

  validate = () => {
    let nomError = "";
    let descError = "";
    // let srcError = "";
    let prixError = "";
    let qteError = "";

    if (!this.state.nom.match(/^[A-Za-z\s]+$/)) {
      nomError = "Le nom doit contenir des lettres";
    }

    if (!this.state.description) {
      descError = "La description du produit est obligatoire";
    }
    // if (!this.state.srcError) {
    //   srcError = "Le nom du produit est obligatoire";
    // }

    if (!this.state.prix.match(/\d/)) {
      prixError = "Veuillez entrer un nombre dans le prix";
    }
    if (!this.state.qte.match(/^[0-9]+$/)) {
      qteError = "Veuillez entrer un nombre dans la quantité";
    }

    if (nomError || descError || prixError || qteError) {
      this.setState({ nomError, descError, prixError, qteError });
      return false;
    }
    return true;
  };

  chooseCategory = name => {
    if (name === "Visage") {
      this.setState({ idCat: 1 });
    } else if (name === "Cheveux") {
      this.setState({ idCat: 2 });
    } else if (name === "Huile") {
      this.setState({ idCat: 3 });
    } else if (name === "Peau") {
      this.setState({ idCat: 4 });
    } else if (name === "Aliment") {
      this.setState({ idCat: 5 });
    }
  };

  render() {
    return (
      <>
        <button className="add" onClick={this.toggleNewProductModal}>
          <i className="fas fa-plus"></i> Ajouter un produit
        </button>
        <div>
          <Modal
            isOpen={this.state.modalNewProduct}
            toggle={this.toggleNewProductModal}
          >
            <ModalHeader toggle={this.toggleNewProductModal}>
              Ajouter un nouveau Produit
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <img
                  src={this.state.url}
                  alt=""
                  style={{
                    width: "100px",
                    height: "100px",
                    display: "block",
                    margin: "auto",
                    marginBottom: "3px",
                    borderRadius: "8px"
                  }}
                />
                <Label>Nom de la catégorie</Label>
                <Input
                  type="select"
                  name="nomCat"
                  onChange={this.handleOnChange}
                  defaultValue="Choisir une catégorie..."
                >
                  <option disabled>Choisir une catégorie...</option>
                  <option>Visage</option>
                  <option>Cheveux</option>
                  <option>Huile</option>
                  <option>Peau</option>
                  <option>Aliment</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label>Nom</Label>
                <Input
                  placeholder="Nom..."
                  name="nom"
                  onChange={this.handleOnChange}
                  autoComplete="off"
                ></Input>
                <p style={{ fontSize: 12, color: "red" }}>
                  {this.state.nomError}
                </p>
              </FormGroup>
              <FormGroup>
                <Label>Description</Label>
                <Input
                  placeholder="Description..."
                  name="description"
                  onChange={this.handleOnChange}
                ></Input>
                <p style={{ fontSize: 12, color: "red" }}>
                  {this.state.descError}
                </p>
              </FormGroup>
              <FormGroup>
                <Label>Provenance et source</Label>
                <Input
                  placeholder="Source..."
                  name="source"
                  onChange={this.handleOnChange}
                ></Input>
                <p style={{ fontSize: 12, color: "red" }}>
                  {this.state.srcError}
                </p>
              </FormGroup>
              <FormGroup>
                <Label>Etat</Label>
                <Input
                  type="select"
                  name="etat"
                  onChange={this.handleOnChange}
                  defaultValue="Choisir un état..."
                >
                  <option disabled>Choisir un état...</option>
                  <option>Vente</option>
                  <option>Rupture de stock</option>
                  <option>Approvisionnement</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label>Prix en DH</Label>
                <Input
                  placeholder="Prix..."
                  name="prix"
                  onChange={this.handleOnChange}
                ></Input>
                <p style={{ fontSize: 12, color: "red" }}>
                  {this.state.prixError}
                </p>
              </FormGroup>
              <FormGroup>
                <Label>Quantité</Label>
                <Input
                  placeholder="Quantité..."
                  name="qte"
                  onChange={this.handleOnChange}
                ></Input>
                <p style={{ fontSize: 12, color: "red" }}>
                  {this.state.qteError}
                </p>
              </FormGroup>
              <FormGroup>
                <Label>L'url de l'image</Label>

                <Input
                  placeholder="Url..."
                  name="url"
                  onChange={this.handleOnChange}
                ></Input>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={this.handleAddProduct}>
                Ajouter
              </Button>
              <Button
                color="secondary"
                onClick={() => {
                  this.toggleNewProductModal();
                  this.clearFormError();
                }}
              >
                Annuler
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </>
    );
  }
}
export default ModalAddProduct;
