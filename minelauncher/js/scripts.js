$(document).ready(function () {

	if ($('.slider').length) {
		initSlider();
	}


	$('[rel=popup]').click(function () {
		showPopup($(this).attr('href'));
		return false;
	});

	$('.close').click(function () {
		closePopup();
		return false;
	});

	$('.changelang').click(function (e) {
		const lang = e.target.textContent === 'Русский' ? 'ru' : 'en';
		loadLocalization(lang);
        localStorage.setItem('lang', lang);
        location.reload();
	});

	$('.overlay').click(function (e) {
		var target = e.srcElement || e.target;
		if (!target.className.search('overlay')) {
			closePopup();
		}
	});

	$(document).keyup(function (e) {
		if (e.keyCode === 27) {
			if ($('.popup').is('.active')) {
				closePopup();
			}

			if ($('.settings .item').is('.active')) {
				$('.settings .item').removeClass('active');
			}
		}
	});

	$('.faq-item .heading').click(function (e) {
		if ($(this).parent().is('.active')) {
			$(this).parent().find('.faq-content').height(0);
			$(this).parent().removeClass('active');
		} else {
			$(this).parent().find('.faq-content').height($(this).parent().parent().find('.faq-content .height').height());
			$(this).parent().addClass('active');
		}
		return false;
	});

	$('.nav-resize').click(function () {
		if ($('.nav').is('.active')) {
			$('.nav').removeClass('active');
		} else {
			$('.nav').addClass('active');
		}
		return false;
	});

	$(document).click(function () {
		if ($('.nav').is('.active')) {
			$('.nav').removeClass('active');
		}
	});


	$('.header .box .next').on('click', function () {
		if ($('.slider .item.active').index() < $('.slider .item').length) {
			$('.slider .container').coverflow('index', $('.slider .item.active').index() + 1);
		}
	});
	$('.header .box .prev').on('click', function () {
		if ($('.slider .item.active').index() > 0) {
			$('.slider .container').coverflow('index', $('.slider .item.active').index() - 1);
		}
	});

	$('.btn-totop').on('click', function () {
		$('html,body').animate({ scrollTop: 0 }, 600);
		return false;
	});

	if ($('.hidden-table').length) {
		$('.hidden-table tr').each(function (i, el) {
			if (i > 3) {
				$(el).hide();
				$('.action-show').css('display', 'inline-block');
			}
		});
	}

	$('.action-show').on('click', function () {
		$(this).parent().find('.hidden-table tr').show(300);
		$(this).hide();
		return false;
	});


	$('.settings .btn.action').on('click', function () {


		if ($(this).parent().is('.active')) {
			$(this).parent().removeClass('active');
		} else {
			if ($('.settings .item').is('.active')) {
				$('.settings .item').removeClass('active');
			}
			$(this).parent().addClass('active');
		}

		return false;
	});

	/* $('.settings .btn-ok').on('click',function(){
		$(this).parent().parent().removeClass('active');
		return false;
	}); */


	$('.btn-settings').on('click', function () {
		if ($('.settings').is('.active')) {
			$('.btn-settings, .settings').removeClass('active');
		} else {
			$('.btn-settings, .settings').addClass('active');
		}
		return false;
    });
    
	$(document).on('click','#one, #two, #forever', function() {
        let id = jQuery(this).attr("id");

        $.post("modules/api.php",
			{ buy_premium: true, duration: id },
			function (data) {
                $('.premium-result').html(data.message);
			}
        );

        return false;
    });
    
	$(document).on('click','#one-more, #two-more, #forever-more', function() {
        let id = jQuery(this).attr("id");

        $.post("modules/api.php",
			{ extend_premium: true, duration: id },
			function (data) {
                $('.premium-result').html(data.message);
			}
        );

        return false;
	});

});

function initSlider() {
	if ($.fn.reflect) {
		$('.slider .item').reflect();
	}
	var slideWidth = $('.main-width').width() - 100;

	if (slideWidth > 938) {
		slideWidth = 938;
	}

	$('.slider .container').coverflow({
		easing: 'easeOutCubic',
		duration: 700,
		index: 0,
		density: 1,
		width: slideWidth,
		visible: 'density',
		outerAngle: 0,
		enableWheel: false,
		outerScale: 0.95,
		innerAngle: 0,
		innerOffset: 350,
		selectedCss: { opacity: 1 },
		outerCss: {},
		change: function (event, cover, index) {
			$('.slider .item').removeClass('active');
			$(cover).addClass('active');
		},
		before: function (event, cover) {
		},
		select: function (event, cover) {
		},
	});

}


function showPopup(el) {
	if ($('.popup').is('.active')) {
		$('.popup').removeClass('active');
	}
	$('body, .overlay, .popup' + el).addClass('active');
}

function closePopup() {
	$('body, .overlay, .popup').removeClass('active');
}

const ru = {
	login: 'Вход',
    reg: 'Регистрация',
    forget: 'Забыли пароль?',
    auth_login: 'Email/Логин',
    auth_pass: 'Пароль',
    reg_pass1: 'Подтверждение пароля',
    reg_login: 'Логин',
    acc_exist: 'Уже есть аккаунт?',
	lang1: 'Русский',
	lang2: 'English',
	prem: 'Премиум',
	news: '',
	download: 'Скачать Майнкрафт',
	mod: 'Скачать моды',
	catalog: 'Каталог скинов',
	help: 'FAQ',
	title: 'Лучший лаунчер Майнкрафт',
	desc: 'Сегодня не так много хороших лаунчеров для игры Майнкрафт<br>Но они всё-таки есть, и один из них MineLauncher',
	dllauncher: 'Скачать MineLauncher',
	main: 'Главная страница',
	settings: 'Настройки',
	skininst: 'Установка скина',
	why: 'Почему MineLauncher?',
	versions: 'Все официальные версии',
	verdesc: 'От Alpha до Snapshots',
	vertext: 'Лаунчер укомплектован всеми доступными версиями игры от разработчиков, в любой момент вы сможете установить одну из них, даже самую новую версию <b>Minecraft 1.14.</b> В них не производилось никаких изменений, все файлы скачиваются с серверов разработчиков, а это значит, что вы получаете идеально чистый Майнкрафт.',
	inst: 'Установка в один клик',
	mods: 'Forge, Optifine',
	modstext: 'Благодаря MineLauncher, у вас появляется возможно установить модифицированную версию игры: <b>Forge</b> - необходим для работы с модами, <b>Optifine</b> - для оптимизации игры и повышения FPS. Всё это нужно искать и устанавливать вручную, лаунчер же всё сделает за вас, вам нужно выбрать только необходимую версию.',
	skins: 'Своя система скинов',
	skincloak: 'Плащи и HD скины',
	skintext: 'У нас на сайте, вы сможете установить свой собственный скин, который увидят все наши пользователи, а можем вас уверить, большинство использует именно наш лаунчер. Система скинов ничем не уступает официальной, даже имеет несколько преимуществ: установка <b>плаща</b> и <b>HD скинов</b>. Из-за этого, скины MineLauncher считаются наилучшими.',
	skincatalog: 'перейти в каталог скинов',
	ad: 'Продвиньте свой сервер<br>купив рекламу в нашем лаунчере',
	addesc: 'Ваш сервер будет показан на главной странице лаунчера в Рекомендациях',
	buyad: 'заказать рекламу',
	regonly: '*только для владельцев сервера',
	terms: 'Пользовательское соглашение',
	contacts: 'Контакты',
	minecraft: 'Minecraft and associated Minecraft images are copyright of Mojang AB.<br>MineLauncher.net is not affiliated with Minecraft and Mojang AB.',
	platform: 'Выберите платформу:',
	windows: 'Windows',
	linux: 'Linux',
    macos: 'MacOs',
    download_title: 'Скачать Майнкрафт бесплатно',
    download_descrs: 'Для начала игры в Майнкрафт, вы должны будете скачать майнкрафт. Мы предоставляем вам возможность скачать майнкрафт бесплатно. Вы можете выбрать нужную для Вас версию для игры в Майнкрафт на нашем сайте.<br><br>'+
        'Minecraft — компьютерная инди-игра в жанре песочницы с элементами симулятора выживания и открытым миром, разработанная шведским программистом Маркусом Перссоном, известным также как «Notch», и позже выпускаемая основанной им компанией Mojang. Перссон занимался разработкой Minecraft с 2009 года.',
    mods_title: 'Скачать Моды майнкрафт бесплатно',
    mods_descrs: 'Для добавления модов, вы должны их искать на разных сайтах. Мы предоставляем вам возможность выбрать моды бесплатно. Вы можете выбрать нужную версию для поиска мода на нашем сайте.<br><br>'+
        'Установить моды можно в 1 клик в нашем лаунчере. Скачать лаунчер можно на главной странице сайта.',
    skins_title: 'Скачать Скин майнкрафт бесплатно',
    skins_descrs: 'Для отображения скина в Майнкрафт, вы должны будете установить скин. Мы предоставляем вам возможность установить скин бесплатно. Вы можете выбрать свой скин на нашем сайте.<br><br>'+
        'HD скин и плащи — доступны для премиум пользователей. Вы можете выбрать HD скин или плащ на нашем сайте.',
    skin: 'Скины',
    hd_skin: 'HD Скины',
    cloaks: 'Плащи',
    set_sc: 'Поставить',
    answers: 'Ответы на часто задаваемые вопросы',
    contacts_descr: 'Тех.поддержка осущеставляется только через сообщение группы ВК, мы работаем 7 дней в неделю, но перед тем как задавать вопрос, мы рекомендуем вам ознакомиться с разделом FAQ.',
    contacts_descr1: 'По обычным вопросам',
    lk_skin: 'Скин',
    lk_skin_hd: 'HD скин',
    lk_catalog: 'Каталог',
    lk_skin_acc: 'Аккаунт',
    lk_skin_ltitle: 'Логин и адрес профиля',
    lk_skin_log: 'Введите логин',
    lk_skin_cpass: 'Сменить пароль',
    lk_skin_restore: 'Сбросить',
    lk_skin_p1: 'Пароль',
    lk_skin_p2: 'Повторите пароль',
    lk_skin_cloak: 'Плащ',
    lk_skin_1: 'Вы успешно сменили скин / плащ!',
    lk_skin_2: 'Не удалось загрузить файл. Обратитесь к администратору!',
    lk_skin_3: 'Файл должен иметь расширение jpg/png/jpeg.',
    lk_skin_4: 'Не удалось загрузить HD скин. (Нет прав)',
    lk_skin_5: 'Файл не должен превышать ',
    lk_skin_6: 'Файл успешно загружен!',
    lk_skin_7: 'Вы успешно сбросили скин и плащ!',
    lk_skin_8: 'Не удалось сбросить скин и плащ!',
    lk_skin_9: 'Статья успешно добавлена!',
    lk_skin_admin: 'Администрирование',
    lk_skin_promo: 'Промо-коды',
    lk_skin_сpromo: 'Создать промокод',
    lk_skin_epromo: 'Введите промокод',
    lk_skin_perc: 'Дробный процент (Например, 0.5)',
    lk_skin_cpromo: 'Создать промо-код',
    lk_skin_addtopic: 'Добавить майнкрафт/мод статью',
    lk_skin_name: 'Название',
    lk_skin_short: 'Краткое описание',
    lk_skin_full: 'Полное описание',
    lk_skin_keys: 'Ключевые слова (через запятую с пробелом)',
    lk_skin_vers: 'Версия майнкрафт',
    lk_skin_ru: 'Русский (ru)',
    lk_skin_en: 'English (en)',
    lk_skin_topic: 'Статья',
    lk_skin_mod: 'Мод',
    lk_skin_add: 'Добавить',
    lk_skin_lang: 'Язык:',
    lk_skin_type: 'Тип:',
    lk_skin_img_b: 'Картинка для блока:',
    lk_skin_img_full: 'Картинка полная:',
    lk_skin_skins_cloaks: 'Скины и плащи',
    lk_skin_upload: 'Загрузить',
    lk_skin_file: 'Файл',
    lk_skin_month: 'МЕСЯЦ',
    lk_skin_extend: 'Продление премиума',
    lk_skin_extend1: 'продлить за',
    lk_skin_forever: 'НАВСЕГДА',
    lk_skin_activ: 'Активировать',
    lk_skin_bonus: 'Введите бонустный код',
    lk_skin_sum: 'Введите сумму пополнения',
    lk_skin_add_b: 'Пополнить',
    lk_skin_extend_b: 'Пополнение баланса',
    restore_pass: 'Восстановление пароля',
    send: 'Отправить',
    url_windows: 'Ссылка на файл для Windows',
    url_other: 'Ссылка на файл для других ОС',
}

const en = {
	login: 'Login',
    reg: 'Registration',
    forget: 'Forget password?',
    auth_login: 'Email/Login',
    auth_pass: 'Password',
    reg_pass1: 'Repeat password',
    reg_login: 'Login',
    acc_exist: 'Do you have already account?',
	lang2: 'Русский',
	lang1: 'English',
	prem: 'Premium',
	news: '',
	download: 'Download Minecraft',
	mod: 'Download mods',
	catalog: 'Skins catalog',
	help: 'FAQ',
	title: 'Best Minecraft Launcher',
	desc: 'Today there are not so many good launchers for Minecraft<br>But they are still there, and one of them is MineLauncher',
	dllauncher: 'Download MineLauncher',
	main: 'Home page',
	settings: 'Settings',
	skininst: 'Install skin',
	why: 'Why MineLauncher?',
	versions: 'Все официальные версии',
	verdesc: 'От Alpha до Snapshots',
	vertext: 'Лаунчер укомплектован всеми доступными версиями игры от разработчиков, в любой момент вы сможете установить одну из них, даже самую новую версию <b>Minecraft 1.14.</b> В них не производилось никаких изменений, все файлы скачиваются с серверов разработчиков, а это значит, что вы получаете идеально чистый Майнкрафт.',
	inst: 'Установка в один клик',
	mods: 'Forge, Optifine',
	modstext: 'Благодаря MineLauncher, у вас появляется возможно установить модифицированную версию игры: <b>Forge</b> - необходим для работы с модами, <b>Optifine</b> - для оптимизации игры и повышения FPS. Всё это нужно искать и устанавливать вручную, лаунчер же всё сделает за вас, вам нужно выбрать только необходимую версию.',
	skins: 'Своя система скинов',
	skincloak: 'Плащи и HD скины',
	skintext: 'У нас на сайте, вы сможете установить свой собственный скин, который увидят все наши пользователи, а можем вас уверить, большинство использует именно наш лаунчер. Система скинов ничем не уступает официальной, даже имеет несколько преимуществ: установка <b>плаща</b> и <b>HD скинов</b>. Из-за этого, скины MineLauncher считаются наилучшими.',
	skincatalog: 'перейти в каталог скинов',
	ad: 'Продвиньте свой сервер<br>купив рекламу в нашем лаунчере',
	addesc: 'Ваш сервер будет показан на главной странице лаунчера в Рекомендациях',
	buyad: 'заказать рекламу',
	regonly: '*только для владельцев сервера',
	terms: 'Terms of use',
	contacts: 'Contacts',
	minecraft: 'Minecraft and associated Minecraft images are copyright of Mojang AB.<br>MineLauncher.net is not affiliated with Minecraft and Mojang AB.',
	platform: 'Выберите платформу:',
	windows: 'Windows',
	linux: 'Linux',
    macos: 'MacOs',
    download_title: 'Download Minecraft free',
    download_descrs: 'To start the game in Minecraft, you will need to download minecraft. We give you the opportunity to download minecraft for free. You can choose the version you need to play Minecraft on our website.<br><br>'+
        'Minecraft is an indie computer game in the sandbox genre with elements of a survival simulator and the open world, developed by the Swedish programmer Marcus Persson, also known as “Notch”, and later produced by the Mojang company he founded. Persson has been developing Minecraft since 2009.',
    mods_title: 'Download minecraft Mods for free',
    mods_descrs: 'To add mods, you have to search for them on different sites. We give you the opportunity to choose mods for free. You can select the desired version to search for fashion on our website.<br><br>'+
        'You can install mods in 1 click in our launcher. You can download the launcher on the main page of the site.',
    skins_title: 'Download skin minecraft for free',
    skins_descrs: 'To display the skin in Minecraft, you will need to set the skin. We provide you the opportunity to set the skin for free. You can choose your skin on our website.<br><br>'+
        'HD skins and capes are available to premium users. You can choose an HD skin or a coat on our website.',
    skin: 'Skins',
    hd_skin: 'HD Skins',
    cloaks: 'Cloaks',
    set_sc: 'Update',
    answers: 'Answers to frequently asked questions',
    contacts_descr: 'Tech support is provided only through the VK group message, we work 7 days a week, but before asking a question, we recommend that you familiarize yourself with the FAQ section.',
    contacts_descr1: 'For any questions',
    lk_skin: 'Skin',
    lk_skin_hd: 'HD skin',
    lk_catalog: 'Catalog',
    lk_skin_acc: 'Account',
    lk_skin_ltitle: 'Login and profile address',
    lk_skin_log: 'Enter login',
    lk_skin_cpass: 'Change password',
    lk_skin_p1: 'Password',
    lk_skin_p2: 'Repeat password',
    lk_skin_cloak: 'Cape',
    lk_skin_restore: 'Restore',
    lk_skin_1: 'You have successfully changed skin / cape!',
    lk_skin_2: 'Не удалось загрузить файл. Обратитесь к администратору!',
    lk_skin_3: 'Файл должен иметь расширение jpg/png/jpeg.',
    lk_skin_4: 'Не удалось загрузить HD скин. (Нет прав)',
    lk_skin_5: 'Файл не должен превышать',
    lk_skin_6: 'Файл успешно загружен!',
    lk_skin_7: 'Вы успешно сбросили скин и плащ!',
    lk_skin_8: 'Не удалось сбросить скин и плащ!',
    lk_skin_9: 'Статья успешно добавлена!',
    lk_skin_admin: 'Administrating',
    lk_skin_promo: 'Promocodes',
    lk_skin_сpromo: 'Create promo',
    lk_skin_epromo: 'Введите промокод',
    lk_skin_perc: 'Дробный процент (Например, 0.5)',
    lk_skin_cpromo: 'Создать промо-код',
    lk_skin_addtopic: 'Добавить майнкрафт/мод статью',
    lk_skin_name: 'Название',
    lk_skin_short: 'Краткое описание',
    lk_skin_full: 'Полное описание',
    lk_skin_keys: 'Ключевые слова (через запятую с пробелом)',
    lk_skin_vers: 'Версия майнкрафт',
    lk_skin_ru: 'Русский (ru)',
    lk_skin_en: 'English (en)',
    lk_skin_topic: 'Статья',
    lk_skin_mod: 'Мод',
    lk_skin_add: 'Добавить',
    lk_skin_lang: 'Язык:',
    lk_skin_type: 'Тип:',
    lk_skin_img_b: 'Картинка для блока:',
    lk_skin_img_full: 'Картинка полная:',
    lk_skin_skins_cloaks: 'Скины и плащи',
    lk_skin_upload: 'Upload',
    lk_skin_file: 'File',
    lk_skin_month: 'МЕСЯЦ',
    lk_skin_extend: 'Продление премиума',
    lk_skin_extend1: 'продлить за',
    lk_skin_forever: 'НАВСЕГДА',
    lk_skin_activ: 'Активировать',
    lk_skin_bonus: 'Введите бонустный код',
    lk_skin_sum: 'Введите сумму пополнения',
    lk_skin_add_b: 'Пополнить',
    lk_skin_extend_b: 'Пополнение баланса',
    restore_pass: 'Pass restoring',
    send: 'Send',
    url_windows: 'Ссылка на файл для Windows',
    url_other: 'Ссылка на файл для других ОС',
}

const languages = {
	'ru': ru,
	'en': en,
}

const langFromStorage = localStorage.getItem('lang') || 'ru';

function loadLocalization(lang) {
	const language = languages[lang] || languages['ru'];
	Object.keys(language).forEach(el => {
        $('span.t.t-' + el).html(language[el]);
        $('input:text.t.t-'+el).attr('placeholder', language[el]);
	});

	$(".lang .current img").attr("src", "images/lang-" + (lang || 'ru') + ".svg");
	$(".lang .another img").attr("src", "images/lang-" + (lang !== 'en' ? 'en' : 'ru') + ".svg");
}

loadLocalization(langFromStorage);