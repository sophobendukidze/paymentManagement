<?php 

class MySQL{
	
	private $DBServer = 'localhost';
	private $DBName = 'payment';
	private $DBUser = 'root';
	private $DBPass = '';//'123';
	private $PDO;
	public $isConnected = false;
	public $ROWS = array();
	public $MySQLError = false;
	
	function __construct(){
		
		$this->isConnected = true;
		try{
			$this->PDO = new PDO('mysql:host=' . $this->DBServer . ';port=3306;dbname=' . $this->DBName . ';charset=utf8', 
			$this->DBUser, $this->DBPass);
			$this->PDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		}
		catch(PDOException $ex){
			$this->isConnected = false;
		}
		
	}
	
	public function RUNQUERY($Query,$Params = array(), $FetchBool = true){
		
		$result = true;
		$this->ROWS = array();

		try{
			$Run = $this->PDO->prepare($Query);
			$Run->execute($Params);
            if($FetchBool){
			    $this->ROWS = $Run->fetchAll(PDO::FETCH_ASSOC);
            }
			//$result = $this->ROWS;

		}
		
		catch(PDOException $ex){
			$this->ROWS = array();
			echo $this->MySQLError = $ex->getMessage();
			$result = false;
		}

		return $result;
		
	}
	
	public function ESCAPE($string){
		return $this->PDO->QUOTE($string);	
	}

    public function LASTINSERTID(){
        return $this->PDO->lastInsertId();
    }
		
}