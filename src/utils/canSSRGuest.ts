import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult  } from "next";
import { redirect } from "next/dist/server/api-utils";
import { parseCookies } from "nookies";

//funcoes para páginas que só podem ser acessadas por visitantes

export function canSSRGuest<P>(fn: GetServerSideProps<P>){
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>>=>{

        const cookies = parseCookies(ctx);

        //Se o usuário tentar acessar a página tendo já um login salvo redirecionamos
        if(cookies['@nextauth.token']){
            return {
                redirect:{
                    destination: '/dashboard',
                    permanent: false,

                }

            } 
        }


        return await fn(ctx);

    }

}