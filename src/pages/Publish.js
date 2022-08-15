import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Publish = ({ token }) => {
  const [file, setFile] = useState({});
  const [preview, setPreview] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [color, setColor] = useState("");
  const [selectedWearRate, setSelectedWearRate] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");
  const [dataImg, setDataImg] = useState();
  const [acceptedExchange, setAcceptedExchange] = useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("picture", file);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("size", selectedSize);
      formData.append("color", color);
      formData.append("condition", selectedWearRate);
      formData.append("city", city);
      formData.append("brand", selectedBrand);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setDataImg(response.data.product_image.secure_url);
    } catch (error) {
      alert(error);
    }
  };

  return token ? (
    <div className="publish">
      <h2>Vends ton article</h2>
      <div className="publish-contain">
        <form onSubmit={handleSubmit}>
          <div className="add-file">
            {preview ? (
              <div className="preview-bloc">
                <div className="preview-pict">
                  <img src={preview} alt="pré-visualisation des articles" />
                </div>
                <div
                  className="close-image"
                  onClick={() => {
                    setPreview("");
                  }}
                >
                  X Close
                </div>
              </div>
            ) : (
              <div className="drag-add">
                <div className="add-input">
                  <label htmlFor="file" className="label-add-file">
                    <span className="add-img">+</span>
                    <span>Ajoute une photo</span>
                  </label>
                  <input
                    id="file"
                    type="file"
                    className="input-file"
                    onChange={(event) => {
                      setFile(event.target.files[0]);
                      setPreview(URL.createObjectURL(event.target.files[0]));
                    }}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="title-input">
            <div className="text-input">
              <label htmlFor="title">
                <h6>Titre</h6>
              </label>

              <input
                type="text"
                id="title"
                name="title"
                value={title}
                placeholder="ex: Chemise Sézane verte"
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>
            <div className="text-input">
              <label htmlFor="description">
                <h6>Décris ton article</h6>
              </label>

              <textarea
                name="description"
                id="description"
                rows="5"
                value={description}
                placeholder="ex: porté quelquefois, taille correctement"
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              ></textarea>
            </div>
          </div>
          <div className="title-input">
            <div className="text-input">
              <label htmlFor="selectedBrand">
                <h6>Marque</h6>
              </label>

              <input
                type="text"
                id="selectedBrand"
                name="selectedBrand"
                placeholder="ex: Zara"
                value={selectedBrand}
                onChange={(event) => {
                  setSelectedBrand(event.target.value);
                }}
              />
            </div>
            <div className="text-input">
              <label htmlFor="selectedSize">
                <h6>Taille</h6>
              </label>

              <input
                type="text"
                id="selecteSize"
                name="selecteSize"
                placeholder="ex: L / 40 / 12"
                value={selectedSize}
                onChange={(event) => {
                  setSelectedSize(event.target.value);
                }}
              />
            </div>
            <div className="text-input">
              <label htmlFor="color">
                <h6>Couleur</h6>
              </label>

              <input
                type="text"
                id="color"
                name="color"
                placeholder="ex: Fushia"
                value={color}
                onChange={(event) => {
                  setColor(event.target.value);
                }}
              />
            </div>
            <div className="text-input">
              <label htmlFor="wearRate">
                <h4>Etat</h4>
              </label>

              <input
                name="wearRate"
                id="wearRate"
                placeholder="Neuf avec étiquette"
                value={selectedWearRate}
                onChange={(event) => setSelectedWearRate(event.target.value)}
              />
            </div>
            <div className="text-input">
              <label htmlFor="city">
                <h6>Lieu</h6>
              </label>

              <input
                name="city"
                id="city"
                placeholder="ex: Paris"
                value={city}
                onChange={(event) => setCity(event.target.value)}
              />
            </div>
          </div>
          <div className="title-input">
            <div className="text-input ">
              <label htmlFor="price">
                <h6>Prix</h6>
              </label>

              <div className="checkbox-consents">
                <input
                  type="text"
                  id="price"
                  name="price"
                  placeholder="0,00 €"
                  value={price}
                  onChange={(event) => {
                    setPrice(Number(event.target.value));
                  }}
                />
                <div className="checkbox-input">
                  {acceptedExchange ? (
                    <label
                      htmlFor="exchange"
                      className="checked-consent"
                    ></label>
                  ) : (
                    <label
                      htmlFor="exchange"
                      className="checkbox-consent-label"
                    ></label>
                  )}
                  <input
                    type="checkbox"
                    name="exchange"
                    id="exchange"
                    value={acceptedExchange}
                    onChange={() => setAcceptedExchange(!acceptedExchange)}
                  />
                  <span>Je suis intéressé(e) par les échanges</span>
                </div>
              </div>
            </div>
          </div>
          <div className="form-button-add">
            <button type="submit" className="form-validate">
              Ajouter
            </button>
          </div>
        </form>
        {dataImg && (
          <div className="picture-publish">
            <p>Votre Offre est bien publiée</p>
            <img src={dataImg} alt="Offre Publiée" />
          </div>
        )}
      </div>
    </div>
  ) : (
    <Navigate to="/login" state={{ fromPublish: true }} />
  );
};

export default Publish;
