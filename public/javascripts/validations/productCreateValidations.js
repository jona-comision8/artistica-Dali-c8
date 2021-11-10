function qs(element) {
  return document.querySelector(element);
}

window.addEventListener("load", function () {
  let $inputName = qs("#inputName");
  let $categorySelect = qs(".categorySelect");
  let $subcategorySelect = qs(".subcategorySelect");
  let $inputPrice = qs("#inputPrice");
  let $form = qs("form");
  let $file = qs('#formFile')
  let $fileErrors = qs('#fileErrors')
  let $imgPreview = qs('#img-preview')
  let regExNumeric = /^[+]?((\d+(\.\d*)?)|(\.\d+))$/;

  $inputName.addEventListener("blur", function () {
    switch (true) {
      case !$inputName.value.trim():
        nameErrors.innerHTML = "El campo nombre es obligatorio";
        $inputName.classList.add("is-invalid");
        break;
      case $inputName.value.trim().length < 3:
        nameErrors.innerHTML = "Debes ingresar un nombre mayor a 3 caracteres";
        $inputName.classList.add("is-invalid");
        break;
      default:
        $inputName.classList.remove("is-invalid");
        $inputName.classList.add("is-valid");
        nameErrors.innerHTML = "";
        break;
    }
  });

  $categorySelect.addEventListener("change", function () {
    if (!$categorySelect.value.trim()) {
      categoryErrors.innerHTML = "Debes elegir una categoría";
      $categorySelect.classList.add("is-invalid");
    } else {
      $categorySelect.classList.remove("is-invalid");
      $categorySelect.classList.add("is-valid");
      categoryErrors.innerHTML = "";
    }
  });
  $categorySelect.addEventListener("blur", function () {
    if (!$categorySelect.value.trim()) {
      categoryErrors.innerHTML = "Debes elegir una categoría";
      $categorySelect.classList.add("is-invalid");
    } else {
      $categorySelect.classList.remove("is-invalid");
      $categorySelect.classList.add("is-valid");
      categoryErrors.innerHTML = "";
    }
  });

  $subcategorySelect.addEventListener("change", function () {
    if (!$subcategorySelect.value.trim()) {
      subcategoryErrors.innerHTML = "Debes elegir una categoría";
      $subcategorySelect.classList.add("is-invalid");
    } else {
      $subcategorySelect.classList.remove("is-invalid");
      $subcategorySelect.classList.add("is-valid");
      subcategoryErrors.innerHTML = "";
    }
  });
  $subcategorySelect.addEventListener("blur", function () {
    if (!$subcategorySelect.value.trim()) {
      subcategoryErrors.innerHTML = "Debes elegir una categoría";
      $subcategorySelect.classList.add("is-invalid");
    } else {
      $subcategorySelect.classList.remove("is-invalid");
      $subcategorySelect.classList.add("is-valid");
      subcategoryErrors.innerHTML = "";
    }
  });

  $inputPrice.addEventListener("blur", function () {
    switch (true) {
      case !$inputPrice.value.trim():
        priceErrors.innerHTML = "Ingresa un precio válido";
        $inputPrice.classList.add("is-invalid");
        break;
      case !regExNumeric.test($inputPrice.value):
        priceErrors.innerHTML = "Debes ingresar caracteres numéricos";
        $inputPrice.classList.add("is-invalid");
        break;
      default:
        $inputPrice.classList.remove("is-invalid");
        $inputPrice.classList.add("is-valid");
        priceErrors.innerHTML = "";
        break;
    }
  });

  $form.addEventListener("submit", function (e) {
    e.preventDefault();
    let error = false;
    let formElements = this.elements;
    console.log(formElements)
    for (let index = 0; index < formElements.length - 1; index++) {
      if (
        formElements[index].value === "" &&
        formElements[index].name !== "discount" &&
        formElements[index].name !== "description" &&
        formElements[index].name !== "image" ||
        formElements[index].classList.contains('is-invalid') 
      ) {
        formElements[index].classList.add('is-invalid');
        submitErrors.innerHTML = "Los campos señalados son obligatorios";
        error = true;
      }
    }

    if(!error){
        console.log('Todo bien');
        $form.submit()
    }

  });

  $file.addEventListener('change', 
    function fileValidation(){
        let filePath = $file.value, //Capturo el valor del input
            allowefExtensions = /(.jpg|.jpeg|.png|.gif|.web)$/i //Extensiones permitidas
        if(!allowefExtensions.exec(filePath)){ //El método exec() ejecuta una busqueda sobre las coincidencias de una expresión regular en una cadena especifica. Devuelve el resultado como array, o null.
            $fileErrors.innerHTML = 'Carga un archivo de imagen válido, con las extensiones (.jpg - .jpeg - .png - .gif)';
            $file.value = '';
            $imgPreview.innerHTML = '';
            return false;
        }else{
            // Image preview
            console.log($file.files);
            if($file.files && $file.files[0]){
                let reader = new FileReader();
                reader.onload = function(e){
                    $imgPreview.innerHTML = '<img src="' + e.target.result +'"/>';
                };
                reader.readAsDataURL($file.files[0]);
                $fileErrors.innerHTML = '';
                $file.classList.remove('is-invalid')
            }
        }
    })
});
