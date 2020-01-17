<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class LobbyController extends AbstractController
{
    /**
     * @Route("/", name="lobby")
     */
    public function index()
    {
        return $this->render('lobby/index.html.twig', [

        ]);
    }
}
