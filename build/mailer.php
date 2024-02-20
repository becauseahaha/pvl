<?
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json; charset=utf-8');

define('GOOGLE', 1);
define('YANDEX', 2);
define('MAILRU', 3);
define('OTHER', 4);

/*
ГЕНЕРАЦИЯ ПАРОЛЯ ДЛЯ АВТОРИЗАЦИИ В ПОЧТОВОМ СЕРВИСЕ
(подставляется ниже в PROVIDER_PASSWORD)

Google
Создать пароль приложения:
https://myaccount.google.com/apppasswords

Yandex
Поставить галку "С сервера imap.yandex.ru по протоколу IMAP":
https://mail.yandex.ru/?dpda=yes#setup/client
Создать пароль приложения для почты:
https://id.yandex.ru/security/app-passwords

Mail.ru
Создать пароль приложения:
https://account.mail.ru/user/2-step-auth/passwords/

ДРУГИЕ СЕРВИСЫ
Установите для 'PROVIDER' значение OTHER
Укажите smtp-сервер

*/

// Почтовый сервис через который будет отправлено письмо
define('PROVIDER', YANDEX);
define('PROVIDER_USER', 'contact-form-notification@yandex.ru');
define('PROVIDER_PASSWORD', 'acmndxqwnjitbhaa');

// Разкоментируйте строки ниже, если вы используете любой другой почтовый сервис и укажите необходимые параметры
// define('PROVIDER_SMTP', 'smtp.example.com');
// define('PROVIDER_PORT', 465);

// Имя отправителя (лучше указать имя сайта)
define('FROM_NAME', 'PFAFF & VEGA Logistik');

// Получатель письма
define('RECEIVER', 'because.ahaha@gmail.com');


// --------------------------------------------------------------------------------------------------


require 'PHPMailer/loader.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

try {

    $mail->setFrom(PROVIDER_USER, FROM_NAME);
    $mail->addAddress(RECEIVER);

    //Attachments
    // $mail->addAttachment('/tmp/image.jpg', 'new.jpg'); 

    foreach ($_POST as $key => $value) {
        $_POST[$key] = htmlspecialchars($value);
    }

    if (!empty($_POST['subject'])) {
        $mail->Subject = $_POST["subject"];
    }

    $message = '';
    if (!empty($_POST['name'])) $message .= "<p>Имя: <b>{$_POST['name']}</b></p>";
    if (!empty($_POST['phone'])) $message .= "<p>Телефон: <b>{$_POST['phone']}</b></p>";
    if (!empty($_POST['message'])) {
        $_POST['message'] = nl2br($_POST['message']);
        $message .= "<p>Сообщение:</p><p>{$_POST['message']}</p>";
    }

    if (!empty($message)) {
        $mail->Body = $message;
        $mail->send();
    }

    echo json_encode([]);

} catch (Exception $e) {
    echo json_encode([
        'error' => $mail->ErrorInfo
    ]);
}