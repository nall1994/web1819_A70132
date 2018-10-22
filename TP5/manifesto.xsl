<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="html" indent="yes"/>
    
    <xsl:template match="/">
        <xsl:apply-templates/>
    </xsl:template>
    
    <xsl:template match="manifesto">
        <html>
            <head>
                <meta charset="UTF-8"/>
                <title> Manifesto </title>
            </head>
            <body>
                <h1 align="center">Manifesto</h1>
                <xsl:apply-templates/>
            </body>
        </html>
    </xsl:template>
    
    <xsl:template match="meta">
        <hr/>
        <div id="meta">
            <xsl:apply-templates/>
        </div> 
        <hr/>
    </xsl:template>
    
    <xsl:template match="identificador">
        <b>IDENTIFICADOR: </b> <xsl:value-of select="."/>
        <br/>
    </xsl:template>
    
    <xsl:template match="titulo">
        <b>TÍTULO: </b><xsl:value-of select="."/>
        <br/>
    </xsl:template>
    
    <xsl:template match="subtitulo">
        <b>SUB-TÍTULO: </b><xsl:value-of select="."/>
        <br/>
    </xsl:template>
    
    <xsl:template match="dinicio">
        <b>DATA DE INÍCIO: </b><xsl:value-of select="."/>
        <br/>
    </xsl:template>
    
    <xsl:template match="dfim">
        <b>DATA DE FIM: </b><xsl:value-of select="."/>
        <br/>
    </xsl:template>
    
    <xsl:template match="supervisor">
        <b> SUPERVISOR: </b> <a href="{website}"> <xsl:value-of select="nome"/></a> , <a href="mailto:{email}"> Enviar E-mail</a>
    </xsl:template>
    
    <xsl:template match="equipa">
        <hr/>
        <div id="equipa">
            <b> EQUIPA </b>
            <br/>
            <ol>
                <xsl:apply-templates/>
            </ol>          
        </div>
        <hr/>
    </xsl:template>
    
    <xsl:template match="membro">
        <li> <xsl:value-of select="identificador"/> - <a href="{website}"> <xsl:value-of select="nome"/> </a> -> <a href="mailto:{email}"> Enviar Correio </a> 
        </li>
        <p><b> GITHUB LINK: </b> <a href="{github}"> web1819_A70132 </a> </p>
        <img src="{foto/@path}" width="70" height="100"/>
    </xsl:template>
    
    <xsl:template match="resumo">
        <hr/>
        <div id="resumo">
            <b>RESUMO </b>
            <br/>
            <xsl:apply-templates/>
        </div>
        <hr/>
    </xsl:template>
    
    <xsl:template match="para">
        <p>
            <xsl:apply-templates/>
        </p>
    </xsl:template>
    
    <xsl:template match="bold">
        <b>
            <xsl:value-of select="."/>
        </b>
    </xsl:template>
    
    <xsl:template match="italico">
        <i>
            <xsl:value-of select="."/>
        </i>
    </xsl:template>
    
    <xsl:template match="resultados">
        <hr/>
        <b> RESULTADOS </b>
        <br/>
        <div id="resultados">
            <ul>
                <xsl:apply-templates/> 
            </ul>         
        </div>
        <hr/>
    </xsl:template>
    
    <xsl:template match="resultado">
        <li><a href="{@url}"> <xsl:value-of select="."/></a></li>
        <br/>
    </xsl:template>
    
    
    
    
</xsl:stylesheet>