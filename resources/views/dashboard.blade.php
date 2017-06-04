@extends('layouts.app')

@section('content')
<div class="container dashboard">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <!--<div class="panel-heading">Dashboard</div>-->

                <div class="panel-body">
                    <div class="col-xs-6 text-left">
                        <h5>Sync Status <i class="fa fa-check-circle" aria-hidden="true"></i></h5>
                        <p>Last successful sync: <span class='date'>{!! $dateSync !!}</span></p>
                    </div>
                    <div class="col-xs-6 text-right">
                            <button class="btn sync-task" value="/actions/sync/payroll" style="background-color:white; border:1px solid #DDDDDD;">Sync Payroll</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script src="{{asset('js/xero.js')}}"></script>
@endsection
