<?php
    use php\PHPMailer-6.5.1\PHPMailer; //Подключение файлов из папки PHPMailer для работы плагина
    use php\PHPMailer-6.5.1\Exception;

    requere 'php/PHPMailer-6.5.1/src/Exception.php';
    requere 'php/PHPMailer-6.5.1/src/PHPMailer.php';//end

    $mail = new PHPMailer(true); //Объявление файла
    $mail -> CharSet = 'UTF-8'; //Кодировка
    $mail -> setLanguage ('ru', 'phpmailer/language/'); //Языковой файл с ошибками на русском
    $mail ->IsHTML(true); //HTML теги в письме

    //От кого письмо:
    $mail -> setForm('bomkoar@gmail.com', 'Человек');
    //Кому отправить:
    $mail -> addAddress('bomko.aleksey@gmail.com');
    //Тема письма:
    $mail -> Subject = 'Hello World!';

        //Тело письма 
    $body = '<h1> Hello, Alex!</h1>';

    //Проверки на заполненность полей
    if(trim(!empty($_POST['email']))) {
        $body = '<p><strong> E-mail: </strong>' .$_POST['email'].'</p>';
    }

    if(trim(!empty($_POST['message']))) {
        $body = '<p><strong> Сообщение: </strong>' .$_POST['message'].'</p>';
    }

    //Прикрепить файл
    if(!empty($_FILES['image']['tmp_name'])) {
        //путь загрузки файла
        $filePath = __DIR__ . "/files/" . $_FILES['image']['name'];
        //грузим файл
        if (copy($_FILES['image']['tmp_name'], filePath)){
            $fileAttach = $filePath;
            $body.='<p><strong>Фото в приложении: </strong>';
            $mail->addAttchment($fileAttach);
        }
    }

    $mail->Body = $body;

    //Отправляем 
    if (!$mail->send()) {
        $message = 'Ошибка';
    } else {
        $message = 'Данные отправленны!';
    }

    $responce = ['message' => $message]; //формируем json

    header('Content-type: application/json'); //возвращаем в JS на сайте
    echo json_encode($responce);
    ?>
