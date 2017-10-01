<?php

class Response
{

    public $success;
    public $message;
    public $data;

    public function __construct($params = array())
    {
        $this->success = isset($params["success"]) ? $params["success"] : false;
        $this->message = isset($params["message"]) ? $params["message"] : 'unsuccessful';
        $this->data = isset($params["data"]) ? $params["data"] : array();
    }

    public function setSuccess()
    {
        $this->success = true;
        $this->setMessage();
    }

    public function setMessage($message = 'successful')
    {
        $this->message = $message;
    }

    public function setData($data = [])
    {
        $this->data = $data;
    }

    public function toJson()
    {
        return json_encode(array(
            'success' => $this->success,
            'message' => $this->message,
            'data' => $this->data
        ));
    }
}