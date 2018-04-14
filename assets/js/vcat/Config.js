function initConfig() {
    offlineMode = getItem('app_offline');
    enlargeText = getItem('app_vk5post');
    allowLongpoll = getItem('app_longpoll');
    useProxy = getItem('app_useproxy');
    proxyURL = getItem('app_proxyurl');
    if (!offlineMode) {
        setItem('app_offline', 'disabled');
        offlineMode = 'disabled';
    }
    if (!enlargeText) {
        setItem('app_vk5post', 'disabled');
        enlargeText = 'disabled';
    }
    if (!allowLongpoll) {
        setItem('app_longpoll', 'enabled');
        allowLongpoll = 'enabled';
    }
    if (!useProxy) {
        setItem('app_useproxy', 'disabled');
        useProxy = 'disabled';
    }
    if (!proxyURL) {
        setItem('app_proxyurl', 'http://vcatclient.000webhostapp.com/proxy.php');
        proxyURL = 'http://vcatclient.000webhostapp.com/proxy.php';
    }
}

function getThemesInConfig() {
    $(".themePlace").append(
        "<div class=\"card cardDecor semi-transparent back message messageBorder\">\n" +
        " <div class=\"card-body messagePadding\">\n" +
        " <h5 class=\"card-text noPadding smallTitle\">\n" +
        "&lt; Назад" +
        " </h5>\n" +
        " </div>\n" +
        " </div>"
    );
  logInfo("Config", "Get Themes");
    $.getJSON("assets/themes.json", function (json) {
        var currentTheme = getItem('config_theme');
        logInfo("Config", "Got Themes JSON");
        $.each(json['officalThemes'], function (index, value) {
            var isApply = "";
            if (value['themePath'] == currentTheme) {
                isApply = " (установлено)";
            }
            $(".themePlace").append(
                "<div vcat-themePath=\"" + value['themePath'] + "\" vcat-themeName=\"" + value['themeName'] + "\" class=\"card cardDecor semi-transparent themeSwitch message messageBorder\">\n" +
                " <div class=\"card-body messagePadding\">\n" +
                " <h5 class=\"card-text noPadding smallTitle\">\n" +
                value['themeName'] + isApply +
                " </h5>\n" +
                " <p class=\"card-text\">\n" +
                value['themeDescription'] +
                " </p>\n" +
                " <p class=\"card-text\">\n<i>От " +
                value['themeAuthor'] +
                " </i></p>\n" +
                " </div>\n" +
                " </div>"
            );
        });

        $(".themeSwitch").click(function () {
            var themePath = $(this).attr('vcat-themePath');
            var themeName = $(this).attr('vcat-themeName');
            setItem('config_theme', themePath);
            setItem('config_theme_name', themeName);
            themes_loadTheme(themePath);
            logInfo("Config", "Set Theme to "+themePath);
            bootbox.confirm({
                message: "Тема установлена. Рекомендуем перезагрузить страницу.",
                buttons: {
                    confirm: {
                        label: 'Перезагрузить',
                        className: 'btn-success'
                    },
                    cancel: {
                        label: 'Позже',
                        className: 'btn-danger'
                    }
                },
                callback: function (result) {
                    if (result) {
                        window.location.href = "main.html";
                    }
                }
            });
        });

        $(".back").click(function () {
            getSettings();
        });

        logInfo("Config", "Finish Themes");
    });
}

function getSettings() {
    $('.htmlContainer').html("<div class='cardContainer'></div>");
    var cfg1 = "отключено";
    var cfg1a = 'enabled';
    if (offlineMode == "enabled") {
        cfg1 = 'включено';
        cfg1a = 'disabled';
    }
    var cfg2 = "отключено";
    var cfg2a = 'enabled';
    if (enlargeText == "enabled") {
        cfg2 = 'включено';
        cfg2a = 'disabled';
    }
    var cfg3 = "отключено";
    var cfg3a = 'enabled';
    if (allowLongpoll == "enabled") {
        cfg3 = 'включено';
        cfg3a = 'disabled';
    }
    var cfg4 = "отключено";
    var cfg4a = 'enabled';
    if (useProxy == "enabled") {
        cfg4 = 'включено';
        cfg4a = 'disabled';
    }
    themeName = getItem("config_theme_name");
    addSCategory('Интерфейс');
    $('.cardContainer').append('<div class="card cardDecor semi-transparent postCard message messageBorder themes">\n' +
        '    <div class="card-body messagePadding">\n' +
        '        <h5 class="card-title noPadding smallTitle">Темы</h5>\n' +
        '        <p class="card-text">Текущая тема: '+themeName+'</p>\n' +
        '    </div>\n' +
        '</div>');
    $('.cardContainer').append('<div class="card cardDecor semi-transparent postCard message messageBorder configSet pointer" vcat-config="app_offline" vcat-shouldon="'+cfg1a+'">\n' +
        '    <div class="card-body messagePadding">\n' +
        '        <h5 class="card-title noPadding smallTitle">Оффлайн-режим ('+cfg1+')</h5>\n' +
        '        <p class="card-text">Включает режим "вне сети". Это может не сработать в ряде случаев.</p>\n' +
        '    </div>\n' +
        '</div>');
    $('.cardContainer').append('<div class="card cardDecor semi-transparent postCard message messageBorder configSet pointer" vcat-config="app_vk5post" vcat-shouldon="'+cfg2a+'">\n' +
        '    <div class="card-body messagePadding">\n' +
        '        <h5 class="card-title noPadding smallTitle">Увеличение текста ('+cfg2+')</h5>\n' +
        '        <p class="card-text">Увеличение текста в ленте новостей, если в нем нет вложений.</p>\n' +
        '    </div>\n' +
        '</div>');
    addSCategory('Основное');
    $('.cardContainer').append('<div class="card cardDecor semi-transparent postCard message messageBorder configSet pointer" vcat-config="app_longpoll" vcat-shouldon="'+cfg3a+'">\n' +
        '    <div class="card-body messagePadding">\n' +
        '        <h5 class="card-title noPadding smallTitle">Использовать Longpoll ('+cfg3+')</h5>\n' +
        '        <p class="card-text">Динамическое обновление сообщений. Отключите для повышения стабильности.</p>\n' +
        '    </div>\n' +
        '</div>');
    $('.cardContainer').append('<div class="card cardDecor semi-transparent postCard message messageBorder configSet pointer" vcat-config="app_useproxy" vcat-shouldon="'+cfg4a+'">\n' +
        '    <div class="card-body messagePadding">\n' +
        '        <h5 class="card-title noPadding smallTitle">Удаленный прокси ('+cfg4+')</h5>\n' +
        '        <p class="card-text">Использовать удаленный прокси вместо серверного. Это может повлиять на работу приложения.</p>\n' +
        '    </div>\n' +
        '</div>');
    $('.cardContainer').append('<div class="card cardDecor semi-transparent postCard message messageBorder configSetProxyURL pointer">\n' +
        '    <div class="card-body messagePadding">\n' +
        '        <h5 class="card-title noPadding smallTitle">URL удаленного прокси</h5>\n' +
        '        <p class="card-text">Используется: '+proxyURL+'</p>\n' +
        '    </div>\n' +
        '</div>');
    addSCategory('Информация');
    $('.cardContainer').append('<div class="card cardDecor semi-transparent postCard message messageBorder about pointer">\n' +
        '    <div class="card-body messagePadding">\n' +
        '        <h5 class="card-title noPadding smallTitle">О VCat</h5>\n' +
        '        <p class="card-text">Текущая версия: '+VCAT_VERSION+'</p>\n' +
        '    </div>\n' +
        '</div>');
    //

    $(".configSet").click(function () {
        setConfig($(this).attr('vcat-shouldon'), $(this).attr('vcat-config'));
    });
    $(".configSetProxyURL").click(function () {
        var a = prompt("URL прокси:", proxyURL);
        setConfig(a, "app_proxyurl");
    });
    $(".themes").click(function () {
        $('.htmlContainer').html("<div class='themePlace'></div>");
        getThemesInConfig();
    });
    $(".about").click(function () {
        switchToPage('.navAppConfig', 'itemAbout.html');
        getThemesInConfig();
        $(".back").click(function () {
            getSettings();
        });
    });
}

function addSCategory(categoryName) {
    $('.cardContainer').append('<div class="card cardDecor semi-transparent postCard message messageBorder">\n' +
        '    <div class="card-body category">\n' +
        '        <p class="card-text">'+categoryName+'</p>\n' +
        '    </div>\n' +
        '</div>');
}

function setConfig(check, key) {
    setItem(key, check);
    logInfo("Config", "Set "+key+" to "+check);
    initConfig();
    $('.htmlContainer').html("");
    getSettings();
}

function requestReload() {
    bootbox.confirm({
        message: "Настройка установлена. Для применения изменений перезагрузите страницу.",
        buttons: {
            confirm: {
                label: 'Перезагрузить',
                className: 'btn-success'
            },
            cancel: {
                label: 'Позже',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            if (result) {
                window.location.href = "main.html";
            }
        }
    });
}
