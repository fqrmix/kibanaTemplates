(() => {
	const templates  = [
		{
			id: 0,
			name: 'Null',
			body: 'BodyNull',
			module: 'ModuleNull'
		},
		{
			id: 1,
			name: 'Причина в Кассе',
			body: 'Payload: "uniLabel" && Payload: ("warn" "error" "auth check unsuccessful" "restrictionid") ' +
				'&& NOT Payload: ("error=null" "errors=null" "error=optional" "error=optional.empty" ' +
				'"skip loyalty-gate request" "rollbackpayment")',
			module: 'backend-kassa-main'
		},

		{
			id: 2,
			name: 'Ответ в шопах',
			body: 'Payload: "TraceID" && Payload: ("create-order-refused" "payment approval error")',
			module: 'backend-shop-main'
		},

		{
			id: 3,
			name: 'Поиск платежа по кошельку без попытки',
			body: 'Payload: "Кошелек" && Payload: "CreateShopOrderRequest"',
			module: 'backend-kassa-main'
		},

		{
			id: 4,
			name: 'HTTP-уведомление (TraceID по uniLabel)',
			body: 'Payload: "uniLabel" && Payload: ("QUEUE/eventQueue")',
			module: 'backend-notifier-main'
		},

		{
			id: 5,
			name: 'HTTP-уведомление (Статус по TraceID)',
			body: 'Payload: "TraceID" && Payload: ("httpStatus=")',
			module: 'backend-notifier-main'
		},

		{
			id: 6,
			name: 'HTTP-уведомление (Статус по адресу обработчика)',
			body: 'Payload: "Сайт" && Payload: ("HttpNotifier" "LogginingAsyncHttpFilter" "status=")',
			module: 'backend-notifier-main'
		},

		{
			id: 7,
			name: 'Поиск займа на карту юзера через наш лайт',
			body: 'Payload: "XXXXXX YYYY" && Payload: ("CreateOrderCommand" "nst_unilabel=" "payerAccount")',
			module: 'backend-deposit-main'
		},

		{
			id: 8,
			name: 'Поиск подписки по e-mail',
			body: 'Payload: "Почта" && Payload: ("PaymentAvisoCommand" "NotifyPaymentHeldCommand" "operationLabel" "merchantOrderId")',
			module: 'backend-shop-main'
		},

	]

	const templateSelectBlock = document.createElement('div');
	templateSelectBlock.classList.add('template-select-block');

	const templateSelector = document.createElement('select');
	const options = templates.map(template => {
		const templateOptions = document.createElement('option');

		templateOptions.value = template.id;
		templateOptions.innerText = template.id !== 0
			? template.name
			: 'Выбери шаблон';

		if (template.id === 0) {
			templateOptions.selected = true;
			templateOptions.disabled = true;
		}

		return templateOptions;
	});

	options.map(templateOptions => templateSelector.appendChild(templateOptions));

	const closeSelectorButton = document.createElement('button');
	closeSelectorButton.innerText = '❌';
	closeSelectorButton.title = 'Закрыть';

	templateSelectBlock.style = 'display: flex; z-index: 9999999999999; position: fixed; top: 10px; width: 20%; margin: 20px; margin-left: 40%; border: 2px solid #8b3ffd; background-color: #fff; padding: 20px; color: white;'
	templateSelector.style = 'border: 1px solid #8b3ffd; border-radius: 5px 0px 0px 5px; width: 80%; border-right: none; height: 3rem;';
	closeSelectorButton.style = 'width: 19%; border: 1px solid #8b3ffd; border-radius: 0px 5px 5px 0px; border-left: none; cursor: pointer;';

	templateSelector.addEventListener('change', event => {
		const data = templates.find(currentTemplate => currentTemplate.id === +event.target.value);
		navigator.clipboard.writeText(data.body)
			.then(() => {
				confirm("Текст шаблона скопирован в буфер обмена. \nМодуль: " + data.module +
					"\n\nЗакрыть окно?")
					? templateSelectBlock.remove()
					: console.log('Window is not closed. Continue');
			})
			.catch(err => {
				console.log('Something went wrong', err);
			});
	});

	closeSelectorButton.addEventListener('click', () => templateSelectBlock.remove());

	templateSelectBlock.appendChild(templateSelector);
	templateSelectBlock.appendChild(closeSelectorButton);
	document.body.appendChild(templateSelectBlock);
})();
