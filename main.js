     $(document).ready(function() {
            const $mobileMenu = $('#mobile-menu');
            const $navLinks = $('.nav-links');
            const $navLinksList = $('.nav-links li a'); // メニュー内の各リンク

            // ハンバーガーメニューのクリックイベント
            $mobileMenu.on('click', function() {
                $navLinks.slideToggle('fast', function() {
                    // slideToggle完了後にactiveクラスを切り替える
                    if ($(this).is(':visible')) {
                        $(this).addClass('active');
                        $('body').addClass('no-scroll');
                    } else {
                        $(this).removeClass('active');
                        $('body').removeClass('no-scroll');
                    }
                });
                $mobileMenu.toggleClass('open'); // ボタン自体のスタイル変更用
            });

            // スムーズスクロールの実装（メニューを閉じる処理を追加）
            $navLinksList.on('click', function(e) {
                e.preventDefault();

                const targetId = $(this).attr('href');
                const $targetSection = $(targetId);

                if ($targetSection.length) {
                    $('html, body').animate({
                        scrollTop: $targetSection.offset().top - $('header').outerHeight()
                    }, 'slow', function() {
                        // アニメーション完了後にメニューを閉じる
                        if ($navLinks.hasClass('active')) {
                            $navLinks.slideUp('fast', function() {
                                $(this).removeClass('active');
                                $('body').removeClass('no-scroll');
                            });
                            $mobileMenu.removeClass('open');
                        }
                    });
                }
            });

            // 画面サイズが変更されたときにメニューの状態をリセット
            $(window).on('resize', function() {
                if ($(window).width() > 768) {
                    $navLinks.css('display', ''); // displayスタイルをリセット
                    $navLinks.removeClass('active');
                    $mobileMenu.removeClass('open');
                    $('body').removeClass('no-scroll');
                }
            });
        });