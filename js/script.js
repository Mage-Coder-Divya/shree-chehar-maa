$(function () {
  /* ---------- Footer year ---------- */
  $("#year").text(new Date().getFullYear());

  /* ---------- Navbar scroll state ---------- */
  $(window).on("scroll", function () {
    $("#navbar").toggleClass("scrolled", $(window).scrollTop() > 60);
    $("#backTop").toggleClass("show", $(window).scrollTop() > 500);
  });

  /* ---------- Mobile menu ---------- */
  function closeMenu() {
    $("#mobileMenu").removeClass("open");
    $("#menuOverlay").removeClass("show");
    $("#navToggle").removeClass("active");
  }
  $("#navToggle").on("click", function () {
    $("#mobileMenu").toggleClass("open");
    $("#menuOverlay").toggleClass("show");
  });
  $("#menuOverlay, .mobile-menu a, #mobileMenuClose").on("click", closeMenu);

  /* ---------- Smooth close menu + scroll on anchor click ---------- */
  $('a[href^="#"]').on("click", function (e) {
    var target = $(this).attr("href");
    if (target.length > 1 && $(target).length) {
      e.preventDefault();
      $("html, body").animate({
        scrollTop: $(target).offset().top - 70
      }, 700);
    }
  });

  /* ---------- Scroll reveal ---------- */
  function revealOnScroll() {
    var winBottom = $(window).scrollTop() + $(window).height() - 90;
    $(".reveal").each(function () {
      if (!$(this).hasClass("in-view") && $(this).offset().top < winBottom) {
        $(this).addClass("in-view");
      }
    });
  }
  revealOnScroll();
  $(window).on("scroll resize", revealOnScroll);

  /* ---------- Initialize Gallery Swiper ---------- */
  const gallerySwiper = new Swiper('.gallery-slider', {
    loop: true,
    grabCursor: true,
    spaceBetween: 0,
    autoplay: {
      delay: 2000,
      disableOnInteraction: true,
      pauseOnMouseEnter: true,
    },

    // Responsive Breakpoints:
    breakpoints: {
      0: {
        slidesPerView: 2,
        spaceBetween: 12,
      },
      641: {
        slidesPerView: 3,
        spaceBetween: 16,
      },
      1025: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // Pagination dots
    pagination: {
      type: 'progressbar',
      el: '.swiper-pagination',
    },
  });
  /* ---------- Gallery Image Full Screen Lightbox Handler ---------- */
  // Use delegated click event on '.gallery-slider' so cloned loop slides work too
  $('.gallery-slider').on('click', '.g-item', function () {
    const imgSrc = $(this).find('img').attr('src');
    const imgAlt = $(this).find('img').attr('alt') || 'Gallery Image';

    // Set the lightbox image source & alt text
    $('#lightboxImg').attr('src', imgSrc).attr('alt', imgAlt);

    // Fade in the lightbox modal
    $('#lightbox').css('display', 'flex').hide().fadeIn(250);
    $('body').css('overflow', 'hidden'); // Lock background scrolling
  });

  /* Close Lightbox when clicking backdrop or Close (X) icon */
  $('.lb-close, #lightbox').on('click', function (e) {
    if (e.target.id === 'lightbox' || $(e.target).closest('.lb-close').length) {
      $('#lightbox').fadeOut(200, function () {
        $('body').css('overflow', ''); // Restore scrolling
      });
    }
  });

  /* Close Lightbox on 'Escape' Key */
  $(document).on('keyup', function (e) {
    if (e.key === 'Escape') {
      $('#lightbox').fadeOut(200, function () {
        $('body').css('overflow', '');
      });
    }
  });
  /* ---------- Animated counters ---------- */
  var countersDone = false;

  function animateCounters() {
    if (countersDone) return;
    var legacyTop = $("#legacy").offset().top;
    if ($(window).scrollTop() + $(window).height() > legacyTop + 100) {
      countersDone = true;
      $("[data-count]").each(function () {
        var $this = $(this),
          target = parseInt($this.attr("data-count"), 10);
        $({
          num: 0
        }).animate({
          num: target
        }, {
          duration: 1800,
          easing: "swing",
          step: function () {
            $this.text(Math.floor(this.num).toLocaleString("en-IN"));
          },
          complete: function () {
            $this.text(target.toLocaleString("en-IN"));
          },
        });
      });
    }
  }
  $(window).on("scroll", animateCounters);
  animateCounters();

  /* ---------- Progress bar fill on view ---------- */
  var progressDone = false;

  function fillProgress() {
    if (progressDone) return;
    var sevaTop = $("#seva").offset().top;
    if ($(window).scrollTop() + $(window).height() > sevaTop + 150) {
      progressDone = true;
      $(".progress-fill").each(function () {
        $(this).css("width", $(this).data("width") + "%");
      });
    }
  }
  $(window).on("scroll", fillProgress);
  fillProgress();

  /* ---------- FAQ accordion ---------- */
  $(".faq-q").on("click", function () {
    var $item = $(this).parent();
    var wasActive = $item.hasClass("active");
    $(".faq-item").removeClass("active").find(".faq-a").css("max-height", 0);
    if (!wasActive) {
      $item.addClass("active");
      $item.find(".faq-a").css("max-height", $item.find(".faq-a p")[0].scrollHeight + 40);
    }
  });
  // init first item
  $(".faq-item.active .faq-a").css("max-height", $(".faq-item.active .faq-a p")[0].scrollHeight + 40);

  /* ---------- Gallery lightbox ---------- */
  $(".g-item").on("click", function () {
    var src = $(this).find("img").attr("src");
    $("#lightboxImg").attr("src", src);
    $("#lightbox").css("display", "flex");
  });
  $(".lb-close, #lightbox").on("click", function (e) {
    if (e.target.id === "lightbox" || $(e.target).closest(".lb-close").length) {
      $("#lightbox").fadeOut(200);
    }
  });

  /* ---------- Amount selector (shared logic for panel + modal) ---------- */
  function bindAmountButtons(groupSelector, inputSelector) {
    $(groupSelector).on("click", ".amount-btn", function () {
      $(groupSelector).find(".amount-btn").removeClass("active");
      $(this).addClass("active");
      var amt = $(this).data("amt");
      var $input = $(inputSelector);
      if (amt == 0) {
        $input.val("").focus();
      } else {
        $input.val(amt);
      }
    });
  }
  bindAmountButtons(".donate-form", "#quickAmount");
  bindAmountButtons("#donationForm", "#modalAmount");

  /* ---------- Toast helper ---------- */
  function showToast(msg) {
    $("#toastMsg").text(msg);
    $("#toast").addClass("show");
    setTimeout(function () {
      $("#toast").removeClass("show");
    }, 3200);
  }

  /* ---------- Donation modal open/close ---------- */
  function openDonateModal(cause) {
    if (cause) {
      $("#modalCause").val(cause);
    }
    $("#donateModal").css("display", "flex");
    $("body").css("overflow", "hidden");
  }

  function closeDonateModal() {
    $("#donateModal").css("display", "none");
    $("body").css("overflow", "");
  }
  $("#navDonateBtn, #heroDonateBtn, #mobileDonateBtn, #panelDonateBtn").on("click", function (e) {
    e.preventDefault();
    closeMenu();
    openDonateModal();
  });
  $(".donate-open").on("click", function () {
    openDonateModal($(this).data("cause"));
  });
  $(".modal-close").on("click", closeDonateModal);
  $("#donateModal").on("click", function (e) {
    if (e.target.id === "donateModal") closeDonateModal();
  });
  $(document).on("keyup", function (e) {
    if (e.key === "Escape") {
      closeDonateModal();
      $("#lightbox").fadeOut(200);
    }
  });

  /* ---------- Form submissions (front-end only demo) ---------- */
  $("#donationForm").on("submit", function (e) {
    e.preventDefault();
    var amt = $("#modalAmount").val() || 0;
    closeDonateModal();
    showToast("Thank you! Your donation of ₹" + Number(amt).toLocaleString("en-IN") + " is recorded. Jai Chehar Maa!");
    this.reset();
    $("#donationForm .amount-btn").removeClass("active");
    $('#donationForm .amount-btn[data-amt="501"]').addClass("active");
    $("#modalAmount").val(501);
  });

  $("#quickDonateSubmit").on("click", function (e) {
    e.preventDefault();
    var amt = $("#quickAmount").val() || 0;
    showToast("Thank you! Your donation of ₹" + Number(amt).toLocaleString("en-IN") + " is recorded. Jai Chehar Maa!");
  });

  $("#contactForm").on("submit", function (e) {
    e.preventDefault();
    showToast("Message sent! The trust office will reach out to you soon.");
    this.reset();
  });

  $("#newsletterBtn").on("click", function (e) {
    e.preventDefault();
    var val = $("#newsletterInput").val();
    if (val) {
      showToast("Subscribed! You will now receive temple updates.");
      $("#newsletterInput").val("");
    }
  });

  /* ---------- Back to top ---------- */
  $("#backTop").on("click", function () {
    $("html, body").animate({
      scrollTop: 0
    }, 600);
  });
});