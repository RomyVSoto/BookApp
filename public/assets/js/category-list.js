$(document).ready(function () {
    $(".delete-category").on("click", function (e) {
      e.preventDefault();
  
      if (confirm("Estás seguro de eliminar esta categoría?")) {
        $(this).closest(".form-delete").submit();
      }
    });
  });
  