describe('e2e_test_pay_avatar', function(){

    it('Authorization from verification', function(){
        cy.visit('https://pokemonbattle.ru/');
        cy.wait(6000);
        cy.get('.login__content').should('be.visible'); //форму ввода видно
        cy.get('.auth__title').contains('Битва покемонов'); //заголовок битва покемонов
        cy.get('p.auth__text').should('be.visible'); //заголов "вход через соцсети"
        cy.get('.auth__social').should('be.visible'); //ссылка на соц.сеть
        cy.get(':nth-child(1) > .auth__input').should('be.visible'); //инпут логина виден
        cy.get('#password').should('be.visible'); // инпут - пароль виден
        cy.get('.auth__restore').should('be.visible'); // кнопка "восстановить" видно
        cy.get('.auth__button').should('be.visible'); // кнопку "Войти" видно
        cy.get('.auth__button').contains('Войти'); // название кнопки - "Войти"
        cy.get('.auth__form > .auth__text').should('be.visible'); // Зарегистрироваться видно
        cy.get('.auth__form > .auth__text').contains('Зарегистрироваться'); // название ссылки -"Зарегистрироваться"
        
        //Авторизация
        cy.get(':nth-child(1) > .auth__input').type('user_login'); //ввод логина
        cy.get('#password').type('user_password'); //ввод пароль
        cy.get('.auth__button').click(); //клик по кнопке "войти"

        //Переход в магазин
        cy.wait(6000); //таймаут
        cy.get('.header__btns > :nth-child(4)').should('be.visible'); //вкладку магазин видно
        cy.get(':nth-child(5) > .header__btn-img').should('be.visible'); //манетку на вкладке магазин видно
        cy.get('.header__btns > :nth-child(4)').contains('Магазин'); //на вкладке надпись "Магазин"
        cy.get('.header__btns > :nth-child(4)').click(); //клик по вкладке магазин

        //Выбор аватара
        cy.wait(6000);
        cy.get(':nth-child(5) > .shop__price').should('be.visible'); //карточку с аватаром видно
        cy.get(':nth-child(5) > .shop__button').should('be.visible'); //кнопку купить видно
        cy.get(':nth-child(5) > .shop__button').contains('Купить'); //на кнопке написанно "Купить"
        cy.get(':nth-child(5) > .shop__button').click(); //клик по кнопке

        //Опалата проверка формы
        cy.wait(6000); //таймаут
        cy.get('.payment__info-button-v2').should('be.visible');
        cy.get('.payment__info-button-v2').should('be.visible');
        cy.get('.payment__info-button-v2').click();
        cy.get('.payment__subblock').should('be.visible');
        cy.get('.payment__subblock > :nth-child(1)').should('be.visible'); 
        cy.get('.payment__subblock > .payment__shopname').should('be.visible');
        cy.get('.payment__subblock > :nth-child(3)').should('be.visible');
        cy.get('.payment__subblock > :nth-child(4)').should('be.visible');
        cy.get('.payment__subblock > :nth-child(5)').should('be.visible');
        cy.get('.payment__subblock > .k_info_pr').should('be.visible');
        cy.get('.pay__payform-v2').should('be.visible');
        cy.get('.pay-btn').should('be.visible');
        cy.get('font').should('be.visible');
        
        //Оплата
        cy.get('.pay__payform-v2 > :nth-child(2) > .pay_base-input-v2').type('4111 1111 1111 1111'); //ввод номера карты
        cy.get(':nth-child(1) > .pay_base-input-v2').type('1235'); //ввод даты
        cy.get('.pay-inputs-box > :nth-child(2) > .pay_base-input-v2').type('125'); //cvv код
        cy.get('.pay__input-box-last-of > .pay_base-input-v2').type('Name Surname'); //ввод имени
        cy.get('.pay-btn').click();

        //Проверка формы подтверждения
        cy.wait(4000); //таймаут
        cy.get('.payment__form-defolt').should('be.visible'); //форму видно
        cy.get('#cardnumber').should('be.visible');
        cy.get('.payment__submit-button').should('be.visible');
        cy.get('.payment__defolt-decline').should('be.visible');

        //отправка кода из смс
        cy.get('#cardnumber').type('56456'); //ввод кода
        cy.get('.payment__submit-button').click(); //нажать кнопку отправить

        //результат
        cy.get('.payment__font-for-success').should('be.visible'); //подтверждение видно
        cy.get('.payment__font-for-success').contains('Покупка прошла успешно'); //надпись подтверждения
        cy.get('.payment__adv').should('be.visible'); //сслыку в магазин видно
        cy.get('.payment__adv').click(); //клик по ссылке в магазин


    })




    


})