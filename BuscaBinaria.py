import random

print('''
    ######################################################
                       JOGO DE ADVINHAÇÃO 
      
    1-Fácil
    2-Médio
    3-Difícil
    ######################################################
''')

difficulty = int(input('Escolha Sua Dificuldade: '))

life = 1
match(difficulty):
    case 1:
        life = 100
    case 2:
        life = 15
    case 3:
        life = 7
    case _:
        print('Opção Inválida, Você terá apenas 1 tentativa')

n = random.randint(1,100)
choose = int(input('\nEscolha um número de 1 a 100: '))

while(n != choose and life > 1):
    life -= 1
    if choose > n:
        print(f'O número que você escolheu é muito alto, ainda tens {life} tentativas.')
        choose = int(input('Escolha novamente: '))
    else:
        print(f'O número que você escolheu é muito baixo, ainda tens {life} tentativas.')
        choose = int(input('Escolha novamente: '))

if life == 1 and choose != n:
    print(f'\nGame Over! Boa sorte na próxima, o número correto era {n}.\n\n')
if choose == n:
    print(f'\nParabéns, voce ganhou! O número correto era {n}.\n\n')