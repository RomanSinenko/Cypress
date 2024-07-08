import * as data from '../helpers/default_data.json' //json с логином и паролем
import * as main from '../locators/main_page.json' //json локаторы страницы main
import * as result from '../locators/result_page.json' // json с локаторами страницы результат
import * as recovery from '../locators/recovery_password_page.json' // json с локаторами страницы восстановления пароля

describe('Authorization form test', function(){

    beforeEach('Start test', function() {
        cy.visit('/'); //зайти на сайт
        cy.get(main.title).contains('Форма логина'); //модальное окно называется "Форма логина"
        cy.get(main.title).should('have.css', 'color', 'rgb(0, 0, 0)'); //цвет текста "форма логина"
        cy.get(main.email).should('have.attr', 'placeholder', 'E-mail'); //проверить плейсхолдер
        cy.get(main.password).should('have.attr', 'placeholder', 'пароль'); //проверить плейсхолдер
        cy.get(main.login_button).contains('Войти'); //кнопка с надписью "войти"
        cy.get(main.login_button).should('be.visible'); //кнопка видна
        cy.get(main.fogot_pass_btn).contains('Забыли пароль?'); //ссылка на восстановление пароля имеет правильный текст
        cy.get(main.fogot_pass_btn).should('be.visible'); //забыли пароль видно 
        cy.get(main.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)'); //цвет ссылки восстановить пароль
        cy.get(main.footer).should('be.visible'); //ссылка в футоре
    })
    afterEach('Finish test', function() {
        cy.get(result.close).should('be.visible'); //крестик виден для пользователя
        cy.get(result.close).click(); //нажать крестик        
    })

    it('Correct data', function() {
        cy.get(main.email).type(data.login); //ввод логина
        cy.get(main.password).type(data.password); //ввод пароля
        cy.get(main.login_button).click(); //нажать кнопку войти
        cy.get(result.title).contains('Авторизация прошла успешно'); //сообщение об успешной авторизации
        cy.get(result.title).should('be.visible'); //сообщение об авторизации видно
    })
    it('Restore password', function() {
        cy.get(main.fogot_pass_btn).click(); 
        cy.get(recovery.title).contains('Восстановите пароль'); 
        cy.get(recovery.title).should('have.css', 'color', 'rgb(0, 0, 0)'); 
        cy.get(recovery.email).should('have.attr', 'placeholder', 'E-mail'); 
        cy.get(recovery.email).type(data.login); 
        cy.get(recovery.send_button).contains('Отправить код');
        cy.get(recovery.send_button).should('be.visible');
        cy.get(recovery.send_button).click();
    })
    it('Incorrect password', function(){
        cy.get(main.email).type(data.login);
        cy.get(main.password).type('123456789');
        cy.get(main.login_button).click();
        cy.get(result.title).contains('Такого логина или пароля нет');
        cy.get(result.title).should('be.visible'); 
    })
    it('Incorrect login', function(){
        cy.get(main.email).type('test@this.test.com');
        cy.get(main.password).type(data.password);
        cy.get(main.login_button).click();
        cy.get(result.title).contains('Такого логина или пароля нет');
        cy.get(result.title).should('be.visible'); 
    })
    it('invalid login', function(){
        cy.get(main.email).type('testthis.test.com');
        cy.get(main.password).type(data.password);
        cy.get(main.login_button).click();
        cy.get(result.title).contains('Нужно исправить проблему валидации');
        cy.get(result.title).should('be.visible');   
    })
    it('big and small letters in the login', function(){
        cy.get(main.email).type('GerMan@Dolnikov.ru');
        cy.get(main.password).type(data.password);
        cy.get(main.login_button).click();
        cy.get(result.title).contains('Авторизация прошла успешно');
        cy.get(result.title).should('be.visible');  
    })
})